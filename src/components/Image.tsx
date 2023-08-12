import {
  Link as JssLink,
  Field,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs'

import Image from 'next/image'

interface Fields {
  Image: {
    value: {
      src: string
      width: string
      height: string
    }
    editable: boolean
  }
  ImageCaption: Field<string>
  TargetUrl: LinkField
}

type ImageProps = {
  params: { [key: string]: string }
  fields: Fields
}

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
)

export const Default = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext()

  if (props.fields) {
    const id = props.params.RenderingIdentifier
    const { src } = props.fields.Image.value
    const imageSrc = src?.includes('/sitecore/shell/') ? src.replace('/sitecore/shell/', '/') : src

    return (
      <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          {sitecoreContext.pageState === 'edit' ? (
            <Image src={imageSrc} alt="" height={400} width={400} />
          ) : (
            <JssLink field={props.fields.TargetUrl}>
              <Image src={imageSrc} alt="" height={400} width={400} />
            </JssLink>
          )}
          <Text
            tag="span"
            className="image-caption field-imagecaption"
            field={props.fields.ImageCaption}
          />
        </div>
      </div>
    )
  }

  return <ImageDefault {...props} />
}
