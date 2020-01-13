import React, { Component } from "react";
import "./UpdateProducts.css";
import { connect } from "react-redux";
import mappingFunctions from "../../Mapping";
import { withRouter } from "react-router-dom";
import Firebase from "../../Firebase/firebase";
class UpdateProducts extends Component {
  state = {
    name: "",
    gender: "",
    image: null,
    model: null,
    description: "",
    dateAdded: "",
    pid: "",
    price: 0,
    sizes: "",
    type: "",
    imageUrl: "",
    modelUrl: ""
  };
  handler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  multiSelectInputHandler = e => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    this.setState({
      sizes: selected.join(" ") + " "
    });
    console.log(this.state.sizes);
  };
  componentWillMount = async () => {
    const product = await Firebase.fetchProduct(this.props.match.params.id);
    this.setState({
      name: product.name,
      gender: product.gender,
      image: null,
      model: null,
      description: product.description,
      dateAdded: product.dateAdded,
      pid: product.pid,
      price: Number(product.price),
      sizes: product.sizes,
      type: product.type,
      imageUrl: product.image,
      modelUrl: product.model
    });
    console.log(this.state.sizes);
  };
  handleFiles = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };
  submit = async () => {
    if (this.state.image !== null) {
      const ext = this.state.image.name.split(".")[
        this.state.image.name.split(".").length - 1
      ];
      const imageUrl = await Firebase.uploadImage(
        this.state.image,
        ext,
        this.state.pid
      );
      this.setState({
        imageUrl
      });
    }
    if (this.state.model !== null) {
      const modelUrl = await Firebase.uploadModel(
        this.state.model,
        this.state.pid
      );
      this.setState({
        modelUrl
      });
    }
    await Firebase.updateProduct(
      this.state.name,
      this.state.gender,
      this.state.description,
      this.state.imageUrl,
      this.state.modelUrl,
      this.state.sizes,
      this.state.type,
      this.state.pid,
      this.state.price,
      this.state.dateAdded
    );
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="container">
        <h1>Update Products</h1>
        <form className="form-custom">
          <div className="form-group">
            <label htmlFor="pid">Product ID</label>
            <input
              type="text"
              value={this.state.pid}
              className="form-control"
              onChange={this.handler}
              id="pid"
              disabled
              name="pid"
              placeholder="Enter the pid of the product"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              value={this.state.name}
              className="form-control"
              onChange={this.handler}
              id="name"
              name="name"
              placeholder="Enter the name of the product"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type of Product</label>
            <select
              value={this.state.type}
              onChange={this.handler}
              className="form-control"
              id="type"
              name="type"
            >
              <option value="Casual">Casual</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <label>Gender</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              onChange={this.handler}
              value="male"
              checked={this.state.gender == "male"}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              onChange={this.handler}
              checked={this.state.gender == "female"}
              value="female"
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              value={this.state.price}
              className="form-control"
              onChange={this.handler}
              id="price"
              name="price"
              placeholder="Enter the price of the product"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sizes">Size(s) of the Product</label>
            <select
              onChange={this.multiSelectInputHandler}
              multiple
              className="form-control"
              id="sizes"
              name="sizes"
            >
              <option selected={this.state.sizes.includes("6")} value="6">
                6
              </option>
              <option selected={this.state.sizes.includes("7")} value="7">
                7
              </option>
              <option selected={this.state.sizes.includes("8")} value="8">
                8
              </option>
              <option selected={this.state.sizes.includes("9")} value="9">
                9
              </option>
              <option selected={this.state.sizes.includes("10")} value="10">
                10
              </option>
              <option selected={this.state.sizes.includes("11")} value="11">
                11
              </option>
              <option selected={this.state.sizes.includes("12")} value="12">
                12
              </option>
            </select>
          </div>
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  onChange={this.handleFiles}
                  accept="image/*"
                  className="form-control-file"
                  id="image"
                  name="image"
                />
                <label htmlFor="image">{this.state.imageUrl}</label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <img src={this.state.imageUrl} style={{ width: "160px" }}></img>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Model</label>
            <input
              type="file"
              onChange={this.handleFiles}
              className="form-control-file"
              id="model"
              name="model"
            />
            <label htmlFor="image">{this.state.modelUrl}</label>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              onChange={this.handler}
              value={this.state.description}
              name="description"
              placeholder="Enter the Description of the product"
              rows="3"
            ></textarea>
          </div>
          <button
            style={{ marginTop: "40px" }}
            type="button"
            onClick={this.submit}
            className="btn btn-dark btn-block"
          >
            Update Product
          </button>
        </form>
      </div>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(withRouter(UpdateProducts));
