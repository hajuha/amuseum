/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Divider, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData, getImage } from "./apiService";
import parse from "html-react-parser";

const Home = () => {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var trealet = url.searchParams.get("trealet");
  const trealetUrl = "https://hcloud.trealet.com" + trealet;
  const [dataTrealet, setDataTrealet] = useState<any>();
  const [imageBanner, setImageBanner] = useState("");
  const [imageHeader, setImageHeader] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<any>([]);

  const { Paragraph } = Typography;

  const getTrealet = async () => {
    setIsLoading(true);
    try {
      const result = await getData(trealetUrl);
      console.log("result", result);

      const dataImageHeader = (await getImage(
        result.trealet.header.id_logo
      )) as any;
      const dataImageBanner = (await getImage(
        result.trealet.banner.id_image
      )) as any;

      let dataImages: unknown[] = [];

      for (const item of result.trealet.items) {
        let dataImage = (await getImage(item.id_image)) as any;
        dataImage["id_image"] = item.id_image;
        dataImages.push(dataImage);
      }

      setItems(dataImages);
      console.log(dataImages);
      setImageHeader(dataImageHeader.url_full);
      setImageBanner(dataImageBanner.url_full);
      setDataTrealet(result.trealet);
    } catch (err) {
      console.log("err", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTrealet();
  }, []);

  const imageBackground =
    "http://baovatquocgia.baotangso.com/modules/baovat/themes/frontend/default/assets/background.png";

  return (
    <>
      {isLoading ? (
        <Row style={{ height: "100vh" }} align="middle" justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <React.Fragment>
          <div className="header">
            <Row>
              <div className="logo">
                <img alt="logo" src={imageHeader} />
              </div>

              <div className="collection">{dataTrealet?.header?.title}</div>
            </Row>
          </div>

          <div
            className="body"
            style={{ backgroundImage: `url('${imageBackground}')` }}
          >
            <div className="banner">
              <Row>
                <Col span={12}>
                  <h1 className="banner-title">{dataTrealet?.banner?.title}</h1>
                  <p className="banner-content">
                    {parse(`${dataTrealet?.banner?.description}`)}
                  </p>
                </Col>
                <Col span={12}>
                  <img src={imageBanner} width="600" alt="dasdasd" />
                </Col>
              </Row>
            </div>

            <div className="items">
              <Divider />
              <Typography.Title>{dataTrealet?.titleContent}</Typography.Title>
              <Row>
                {items.map((item: any) => (
                  <Col span={6}>
                    <div className="item">
                      <img src={item.url_full} alt="" className="item-image" />
                      <div className="item-title">{item.title}</div>
                      <Paragraph className="item-desc" ellipsis={{ rows: 4 }}>
                        {item.desc}
                      </Paragraph>

                      <Link to={`/detail/${item.id_image}`} className="text">
                        Đọc thêm
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Home;
