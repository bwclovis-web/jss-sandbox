import { Field, RichText, RichTextField, Text } from '@sitecore-jss/sitecore-jss-nextjs'
import classNames from 'classnames'
type Thing = {
  fields: {
    heading: Field<string>
    description: RichTextField
  }
  params: {
    Styles: string
  }
}
const SectionHeading = ({ fields, params }: Thing) => {
  const { heading, description } = fields
  const containerStyles = params && params.Styles ? params.Styles : ''

  const SectionHeadingContainerClasses = classNames({
    'flex flex-col gap-6': true,
    'text-center': containerStyles.includes('txt-center'),
  })

  const SectionHeadingDescriptionClasses = classNames({
    'text-lg': true,
    hidden: containerStyles.includes('hide'),
  })

  return (
    <div className={SectionHeadingContainerClasses}>
      <Text field={heading} tag="h2" class="text-6xl" />
      <RichText field={description} class={SectionHeadingDescriptionClasses} tag="p" />
    </div>
  )
}

export default SectionHeading
