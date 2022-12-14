import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Tooltip,
  Upload,
  message,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getBase64 } from "map/helpers/getBase64";
import { Icon, Style } from "ol/style";
import ImgCrop from "antd-img-crop";

function NewEmployeeForm({ isModalOpen, setIsModalOpen, lastFeature, office }) {
  const [imageList, setImageList] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handlePreviewCancel = () => setPreviewOpen(false);

  const onChange = async ({ fileList, file }) => {
    if (file.type.includes("image/")) {
      if (file instanceof File) {
        const fr = new FileReader();

        fr.onload = () => {
          const img = new Image();

          img.onload = () => {
            setImageSrc(img);
          };
          img.src = fr.result;
        };
        fr.readAsDataURL(file);
      }

      setImageList(fileList);
    } else {
      setImageList([]);
      message.error(<span>Lütfen bir resim yükleyin.</span>);
    }
  };

  const formSubmitHandler = ({ name, title }) => {
    lastFeature.set("name", name);
    lastFeature.set("title", title);

    if (imageSrc) {
      // Style created feature's img
      lastFeature.setStyle(
        new Style({
          image: new Icon({
            crossOrigin: "anonymous",
            img: imageSrc,
            imgSize: [50, 50],
          }),
          zIndex: 1,
        })
      );
    }

    setIsModalOpen(false);
  };

  const cancelFormHandler = () => {
    const { layerGroup } = office;
    layerGroup.getLayers().array_[1].getSource().removeFeature(lastFeature);
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip title="Çalışan Ekle">
        <Radio.Button value="Point">
          <UserAddOutlined />
        </Radio.Button>
      </Tooltip>
      <Modal
        title="Yeni Çalışan"
        open={isModalOpen}
        footer={null}
        onCancel={cancelFormHandler}
      >
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 12,
          }}
          layout="horizontal"
          initialValues={{
            size: "large",
          }}
          size="large"
          onFinish={formSubmitHandler}
          validateMessages={{
            required: "Zorunlu alan.",
          }}
        >
          <Form.Item
            name="name"
            label="Çalışan Adı"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Görevi"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Avatar">
            <ImgCrop grid rotate aspect={50 / 50} shape="round" quality={1}>
              <Upload
                accept="image/*"
                multiple={false}
                listType="picture-card"
                fileList={imageList}
                onPreview={handlePreview}
                onChange={onChange}
                beforeUpload={() => false}
              >
                {imageList.length < 1 && "+ Yükle"}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handlePreviewCancel}
        >
          <img alt="example" src={previewImage} />
        </Modal>
      </Modal>
    </>
  );
}

export default NewEmployeeForm;
