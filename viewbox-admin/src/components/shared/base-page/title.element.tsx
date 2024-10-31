import { Typography } from "antd";
import { useAppSelector } from "../../../hooks"
import Title from "antd/es/typography/Title";

export const TitleElement = () => {
  const {
    title
  } = useAppSelector(x => x.title);
  return (
    <Typography>
      <Title level={3}>{title}</Title>
    </Typography>
  )
}