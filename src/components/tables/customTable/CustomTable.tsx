import React, { useEffect, useState } from "react";
import { Itable as Props, complex } from "../../../interfaces/Itable";
import { useTranslation } from "react-i18next";
import Card from "../../UI/card/Card";
import classes from "./CustomTable.module.scss";

const CustomTable: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  function showModalHandler() {
    setShowModal((prev) => !prev);
  }
  function tableBody(item: complex, index: number) {
    /* type guard (in typescript) */
    if ("name" in item) {
      //for implementing top customers
      return (
        <tr key={index}>
          <td>{item.email}</td>
          <td>{item.name}</td>
          <td>{item.createdOn}</td>
          <td>{item.modifiedOn}</td>
        </tr>
      );
    }
  }

  // const initDataShow = () => {
  //   return props.limit && props.bodyData
  //     ? props.bodyData.slice(0, Number(props.limit))
  //     : props.bodyData;
  // };
  const [dataShow, setDataShow] = useState<complex[]>([]);
  useEffect(() => {
    setDataShow(
      props.limit && props.bodyData
        ? props.bodyData.slice(0, Number(props.limit))
        : props.bodyData
    )
  }, [props]);


  // const [selectedCategory, setSelectedCategory] = useState(
  //   props.selectedCategory
  // );

  // if (props.selectedCategory) {
  //   if (selectedCategory !== props.selectedCategory)
  //     setDataShow(props.bodyData);
  // }
  // setSelectedCategory(props.selectedCategory);

  let pages = 1;

  let range: number[] = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page: number) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData?.slice(start, end));

    setCurrPage(page);
  };

  const { t } = useTranslation();

  return (
    <>
      {/* modal for delete customer and product case*/}
      {/* {showModal ? (
        <Modal
          title={t("deleteCustomer")}
          message={`${t("modalMessage")}`}
          onConfirm={showModalHandler}
        />
      ) : null} */}

      <div className={classes.container}>
        <Card>
          <div className={classes.wrapper}>
            <div className={classes.table__wrapper}>
              <table
                className={props.limit ? classes.largeTable : classes.table}
              >
                {props.headData ? (
                  <thead>
                    <tr>
                      {props.headData.map((item, index) => (
                        <th key={index}>{t(item)}</th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {dataShow.map((item, index) => tableBody(item, index))}
                </tbody>
              </table>
            </div>

            {pages > 1 ? (
              <div className={classes.table__pagination}>
                {range.map((item, index) => (
                  <div
                    key={index}
                    className={`${classes.table__pagination_item} ${currPage === index ? classes.active : ""
                      }`}
                    onClick={() => selectPage(index)}
                  >
                    {item + 1}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </>
  );
};

export default CustomTable;
