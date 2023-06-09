import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import Axios from "axios";

// const axios = require("axios").default;
const cx = classNames.bind(styles);
function Detail(props) {
  const params = useParams();
  const [click, setClick] = useState(0);
  const [validated, setValidated] = useState(false);
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const idBook = params.idBook;
  console.log(idBook);
  let stringUpdate = "http://localhost:8080/book/update/" + idBook;
  let stringAdd = "http://localhost:8080/book/addBook/" + book.name;

  const deleteImge = () => {
    setBook({ ...book, image: null });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const onEditClick = () => {
    const element = document.getElementsByClassName("ip");
    for (let i = 0; i < element.length; i++) {
      document.getElementsByClassName("ip")[i].disabled = false;
    }
    document.getElementById("button").innerHTML = "Save";
    setClick(click + 1);
  };
  const onAddClick = () => {
    setValidated(true);
    const form = document.getElementById("submitForm");
    if (form.checkValidity() === true) {
      fetch(stringAdd, {
        method: "post",
        mode: "cors",
        body: JSON.stringify(book),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        // .then((response) => console.log(response))
        .then((data) => {
          if (data.response === "successAdd") navigate("/");
          else {
            alert("Sách đã tồn tại");
            window.location.reload();
          }
        });
    }
  };
  useEffect(() => {
    if (click > 1) {
      setValidated(true);
      const form = document.getElementById("submitForm");
      if (form.checkValidity() === true) {
        fetch(stringUpdate, {
          method: "post",
          mode: "cors",
          body: JSON.stringify({ ...book, idBook: idBook }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())

          .then((data) => {
            if (data.response === "successUpdate") navigate("/");
            else {
              alert("Update không thành công");
            }
          });
      }
    }
  }, [click]);

  useEffect(() => {
    fetch(`http://localhost:8080/book/${idBook}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));

    if (idBook > 0) {
      const element = document.getElementsByClassName("ip");
      for (let i = 0; i < element.length; i++) {
        document.getElementsByClassName("ip")[i].disabled = true;
      }
    }
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("detail")}>
        <div className={cx("title")}>
          {idBook < 0 ? "New Book" : ` ${book.name}`}
        </div>
        <Form
          className="form-Detail"
          // action={id < 0 ? stringAdd : stringUpdate}
          // method="post"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          id="submitForm"
        >
          <div className={cx("form-wrapper")}>
            <div className={cx("book-detail")}>
              <div className={cx("name-wrap")}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label className={cx("label-item")}>Name*</Form.Label>
                  <Form.Control
                    className={cx("input-text", "ip")}
                    required
                    type="text"
                    value={book.name}
                    id="name"
                    name="name"
                    onChange={(e) => {
                      setBook({ ...book, name: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom01">
                  <Form.Label className={cx("label-item")}>Author*</Form.Label>
                  <Form.Control
                    className={cx("input-text", "ip")}
                    required
                    type="text"
                    value={book.author}
                    id="author"
                    name="author"
                    onChange={(e) => {
                      setBook({ ...book, author: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Author.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <br />
              <label for="detail" className={cx("label-item")}>
                Detail
              </label>
              <textarea
                id="detail"
                name="detail"
                type="text"
                value={book.detail}
                className={cx("input-text", "input-detail", "ip")}
                onChange={(e) => setBook({ ...book, detail: e.target.value })}
              />
              <br />
              <div className={cx("name-wrap")}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label className={cx("label-item")}>
                    Date Release*
                  </Form.Label>
                  <Form.Control
                    className={cx("input-text", "ip")}
                    required
                    type="date"
                    value={book.date}
                    id="date"
                    name="date"
                    onChange={(e) => {
                      setBook({ ...book, date: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Date Release.
                  </Form.Control.Feedback>
                </Form.Group>
                <div>
                  <label for="pagenumbernumber" className={cx("label-item")}>
                    Page number
                  </label>
                  <br />
                  <input
                    id="pagenumber"
                    type="number"
                    name="pagenumber"
                    value={book.pagenumber}
                    className={cx("input-text", "ip")}
                    onChange={(e) =>
                      setBook({ ...book, pagenumber: e.target.value })
                    }
                  />
                </div>
              </div>
              <br />
              <div className={cx("name-wrap")}>
                <div>
                  <label for="category" className={cx("label-item")}>
                    Category
                  </label>

                  <br />
                  <select
                    id="category"
                    name="category"
                    className={cx("select-item", "ip", "input-text")}
                    value={book.category}
                    onChange={(e) =>
                      setBook({ ...book, category: e.target.value })
                    }
                  >
                    <option className={cx("option-item")}></option>
                    <option value="Action" className={cx("option-item")}>
                      Action
                    </option>
                    <option value="Art" className={cx("option-item")}>
                      Art
                    </option>
                    <option value="Comics" className={cx("option-item")}>
                      Comics
                    </option>
                    <option value="History" className={cx("option-item")}>
                      History
                    </option>
                    <option value="Romance" className={cx("option-item")}>
                      Romance
                    </option>
                  </select>
                </div>

                <Form.Group controlId="validationCustom01">
                  <Form.Label className={cx("label-item")}>Price*</Form.Label>
                  <Form.Control
                    className={cx("input-text", "ip")}
                    required
                    type="text"
                    value={book.price}
                    id="price"
                    name="price"
                    onChange={(e) => {
                      setBook({ ...book, price: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Price.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className={cx("book-image")}>
              <input
                id="image"
                name="image"
                type="file"
                className={cx("input-image", "ip")}
                onChange={(e) => {
                  const formData = new FormData();
                  formData.append("file", e.target.files[0]);
                  formData.append("upload_preset", "wm120v5i");
                  Axios.post(
                    "https://api.cloudinary.com/v1_1/dfcx62uhi/image/upload",
                    formData
                  ).then((response) =>
                    setBook({ ...book, image: response.data.secure_url })
                  );
                }}
              />

              <br />

              <Image
                cloudName="dfcx62uhi"
                publicId={book.image}
                width="100%"
                className={cx("img")}
              />
              <div className={cx("name-wrap")}>
                {/* <button onClick={uploadImge} className={cx("btn-custom", "ip")}>
                  Upload Image
                </button> */}
                <br />
                <button onClick={deleteImge} className={cx("btn-custom", "ip")}>
                  Delete Image
                </button>
              </div>
            </div>
          </div>
          <div className={cx("btn-wrapper")}>
            <button
              onClick={idBook < 0 ? onAddClick : onEditClick}
              className={cx("btn-custom", "footer-btn")}
              id="button"
            >
              {" "}
              {idBook < 0 ? "Add" : "Edit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Detail;
