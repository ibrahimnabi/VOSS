import * as firebase from "firebase";
import firebaseConfig from "../Config/config";

const app = firebase.initializeApp(firebaseConfig);

const fetchUsers = async () => {
  const response = await app
    .database()
    .ref("/users")
    .once("value");
  const data = await response.val();
  const users = Object.keys(data).map(key => {
    return {
      ...data[key]
    };
  });
  return users;
};

const fetchUser = async id => {
  const response = await app
    .database()
    .ref("/users/" + id)
    .once("value");
  const data = await response.val();
  return data;
};
const fetchProduct = async id => {
  const response = await app
    .database()
    .ref("/products/" + id)
    .once("value");
  const data = await response.val();
  return data;
};
const fetchOrder = async id => {
  const response = await app
    .database()
    .ref("/orders/" + id)
    .once("value");
  const data = await response.val();
  return data;
};
const fetchProducts = async () => {
  const response = await app
    .database()
    .ref("/products")
    .once("value");
  const data = await response.val();
  const products = Object.keys(data).map(key => {
    return {
      ...data[key]
    };
  });
  return products;
};
const fetchOrders = async () => {
  const response = await app
    .database()
    .ref("/orders")
    .once("value");
  const data = await response.val();
  const orders = Object.keys(data).map(key => {
    return {
      ...data[key]
    };
  });
  return orders;
};
const fetchAdmins = async () => {
  const response = await app
    .database()
    .ref("/admins")
    .once("value");
  const data = await response.val();
  const admins = Object.keys(data).map(key => {
    return {
      ...data[key]
    };
  });
  return admins;
};
const login = async (name = "", password = "") => {
  const admins = await fetchAdmins();
  const admin = admins.find(element => {
    return element.name == name && element.password == password;
  });
  return admin;
};
const addProduct = async (
  name,
  gender,
  description,
  image,
  model,
  sizes,
  type,
  pid,
  price
) => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const date = new Date();
  const dateString =
    ("0" + date.getDate()).slice(-2) +
    "" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "" +
    date.getFullYear();
  const productId = pid + "_" + dateString + "_" + randomNumber;
  const ext = image.name.split(".")[image.name.split(".").length - 1];
  const imageUrl = await uploadImage(image, ext, productId);
  const modelUrl = await uploadModel(model, productId);
  const dateAdded =
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear();
  await app
    .database()
    .ref("/products/" + productId)
    .set({
      name,
      sizes,
      price: price + "",
      type,
      image: imageUrl,
      model: modelUrl,
      dateAdded,
      description,
      gender,
      pid: productId
    })
    .then(
      () => alert("Product has been Added"),
      () => alert("Product has not been added")
    );
};

const updateUser = async (
  name,
  gender,
  birthday,
  userType,
  phone,
  password
) => {
  await app
    .database()
    .ref("/users/" + phone)
    .update({
      name,
      gender,
      birthday,
      userType,
      phone,
      password
    })
    .then(
      () => alert("User has been Updated"),
      () => alert("User has not been Updated")
    );
};
const updateProduct = async (
  name,
  gender,
  description,
  image,
  model,
  sizes,
  type,
  pid,
  price,
  dateAdded
) => {
  await app
    .database()
    .ref("/products/" + pid)
    .update({
      name: name,
      sizes: sizes,
      price: price + "",
      type: type,
      image: image,
      model: model,
      dateAdded: dateAdded,
      description: description,
      gender: gender,
      pid: pid
    })
    .then(
      () => alert("Product has been Updated"),
      () => alert("Product has not been Updated")
    );
};

const updateOrder = async (orderId, status) => {
  await app
    .database()
    .ref("/orders/" + orderId)
    .update({
      status
    })
    .then(
      () => alert("Order has been Updated"),
      () => alert("Order has not been Updated")
    );
};
const deleteProduct = async id => {
  await app
    .database()
    .ref("products/" + id)
    .remove();
};
const uploadImage = async (file, ext, name) => {
  var storageRef = app.storage().ref("/product_images/");
  var ref = storageRef.child(name + "." + ext);
  const response = await ref.put(file).then(function(snapshot) {});
  return await ref.getDownloadURL();
};

const uploadModel = async (file, name) => {
  var storageRef = app.storage().ref("/shoe_models/");
  var ref = storageRef.child(name);
  const response = await ref.put(file).then(function(snapshot) {});
  return await ref.getDownloadURL();
};
const Firebase = {
  fetchUsers,
  fetchAdmins,
  fetchOrders,
  fetchProducts,
  login,
  fetchOrder,
  fetchProduct,
  deleteProduct,
  fetchUser,
  addProduct,
  uploadImage,
  uploadModel,
  updateProduct,
  updateUser,
  updateOrder
};

export default Firebase;
