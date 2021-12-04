/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './style/detail.scss';
import { Link, useParams } from 'react-router-dom';
import { getData, getImage } from './apiService';

function DetailItem() {
  var url_string = window.location.href
  var url = new URL(url_string);
  var trealet = url.searchParams.get("trealet");
  const { id } = useParams();
  const trealetUrl = 'https://hcloud.trealet.com' + trealet;
  console.log(trealetUrl);
  const [item, setItem] = useState<any>();
  const [imageData, setImageData] = useState<any>();

  useEffect(() => {
    const getTrealet = async () => {
      const tempGetData = await getData(trealetUrl);
      console.log(111111, tempGetData, tempGetData?.trealet?.items?.find((item: { id_image: string }) => item.id_image === id));

      setItem(tempGetData?.trealet?.items?.find((item: { id_image: string }) => item.id_image === id));
    }
    getTrealet();

    const getImageItem = async () => {
      const tempGetData = await getImage(id as string);
      setImageData(tempGetData);
    }
    getImageItem();

  }, [])

  return (
    <div>
      <div className="site-content" style={{ backgroundImage: 'url("http://baovatquocgia.baotangso.com/modules/baovat/themes/frontend/default/assets/background.png")' }}>
        <div className="container">
          <div className="row">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', color: '#333', padding: '10px 0' }}>
                <Link to="/">
                  <span style={{ color: '#333' }}>
                    &lt; Quay lại</span>
                </Link>
              </div>
              <div />
            </div>
            <div className="title">
              {imageData?.title}
            </div>
            <div className="content">
              <div className="content-left">
                <img src={imageData?.url_full} width="500" alt="ddddd" />
              </div>
              <div className="content-right">
                <div style={{ marginBottom: '8px' }}>
                  <strong>Chất liệu:</strong> {item?.type}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Niên đại:</strong> {item?.age}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Nơi phát hiện:</strong> {item?.address}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Công nhận:</strong> {item?.recognition}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  {imageData?.desc}
                </div>
              </div>
            </div>

          </div>
          <h2 className="title-3d">Tương tác 3D với hiện vật</h2>

          <iframe width={1000} height={666} src={item?.link3d} title="haha" />
        </div>
      </div>
    </div>
  );
}

export default DetailItem;