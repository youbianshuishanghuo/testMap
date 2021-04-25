export interface FrameType {
  pageList?: SliderType[],
  headerList?: SliderType[],
  sliderList?: SliderType[],
  errorList?: SliderType[]
}

export interface SliderType {
  name: string,
  title?: string,
  groupName?: string[],
  link?: string,
  nextLink?: SliderType[],
  defaultKey?: string
}