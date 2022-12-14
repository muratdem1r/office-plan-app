import { Radio, Tooltip } from "antd";
import {
  ShareAltOutlined,
  BorderOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";

const roomItems = [
  {
    key: "1",
    label: (
      <Tooltip placement="left" title="Poligon">
        <Radio.Button value="Polygon">
          <ShareAltOutlined />
        </Radio.Button>
      </Tooltip>
    ),
  },
  {
    key: "2",
    label: (
      <Tooltip placement="left" title="Kare">
        <Radio.Button value="Square">
          <BorderOutlined />
        </Radio.Button>
      </Tooltip>
    ),
  },
  {
    key: "3",
    label: (
      <Tooltip placement="left" title="Daire">
        <Radio.Button value="Circle">
          <Loading3QuartersOutlined />
        </Radio.Button>
      </Tooltip>
    ),
  },
];

export default roomItems;
