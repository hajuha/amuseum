/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style/detail.scss";
import { Link, useParams } from "react-router-dom";
import { getData, getImage } from "./apiService";
import parse from "html-react-parser";
import { Row, Spin } from "antd";

function DetailItem(): JSX.Element {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var trealet = url.searchParams.get("trealet");
  const { id } = useParams();
  const trealetUrl = "https://hcloud.trealet.com" + trealet;
  const [item, setItem] = useState<any>();
  const [imageData, setImageData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const getDataDetail = async () => {
    setIsLoading(true);
    try {
      const tempGetData = await getData(trealetUrl);
      const tempGetDataImage = await getImage(id as string);

      setItem(
        tempGetData?.trealet?.items?.find(
          (item: { id_image: string }) => item.id_image === id
        )
      );
      setImageData(tempGetDataImage);
    } catch (error) {
      console.log("err", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  return (
    <>
      {isLoading ? (
        <Row style={{ height: "100vh" }} align="middle" justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <div>
          <div
            className="site-content"
            style={{
              backgroundImage:
                'url("http://baovatquocgia.baotangso.com/modules/baovat/themes/frontend/default/assets/background.png")',
            }}
          >
            <div className="container">
              <div className="row">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#333",
                      padding: "10px 0",
                    }}
                  >
                    <Link to="/">
                      <span style={{ color: "#333" }}>&lt; Quay lại</span>
                    </Link>
                  </div>
                  <div />
                </div>

                <div className="title">{imageData?.title}</div>
                <div className="content">
                  <div className="content-left">
                    <img src={imageData?.url_full} width="500" alt="ddddd" />
                  </div>
                  <div className="content-right">
                    <div style={{ marginBottom: "8px" }}>
                      {parse(`${item?.description}`)}
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      {parse(`${imageData?.desc}`)}
                    </div>
                  </div>
                </div>
              </div>

              {item?.titleVideo && (
                <h2 className="title-3d">{item?.titleVideo}</h2>
              )}
              <iframe
                width={1000}
                height={666}
                src={item?.link3d}
                title="haha"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailItem;
