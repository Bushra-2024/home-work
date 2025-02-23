import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editopen, setEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editAge, setEditAge] = useState("");
  const [idx, setIdx] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const Api = "https://678941142c874e66b7d82c21.mockapi.io/users";
  const GetData = async () => {
    try {
      let api =
        statusFilter && statusFilter !== "All"
          ? `${Api}?status=${statusFilter === "Active" ? "true" : "false"}`
          : Api;

      let { data } = await axios.get(api);
      let filtered = data.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(search.toLowerCase())
      );
      setData(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    GetData();
  }, [search, statusFilter]);
  // Add
  const AddData = async () => {
    let newUser = { name, gender, age };
    try {
      await axios.post(Api, newUser);
      setName("");
      setGender("");
      setAge("");
      setOpenModal(false);
      GetData();
    } catch (error) {
      console.error(error);
    }
  };
  // Delete
  const DeleteData = async (id) => {
    try {
      await axios.delete(`${Api}/${id}`);
      GetData();
    } catch (error) {
      console.error(error);
    }
  };
  // Edit
  const EditData = async () => {
    let updatedUser = { name: editName, gender: editGender, age: editAge };
    try {
      await axios.put(`${Api}/${idx}`, updatedUser);
      GetData();
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };
  const openEditModal = (user) => {
    setEdit(true);
    setIdx(user.id);
    setEditName(user.name);
    setEditGender(user.gender);
    setEditAge(user.age);
  };

  return (
    <div style={{ maxWidth: "480px", margin: "20px auto", padding: "0px" }}>
      <TextField
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          margin: "30px auto",
          width: "60%",
        }}
        type="search"
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            color: "black",
            borderRadius: "5px",
            height: "40px",
            width: "100px",
            marginBottom: "10px",
            padding: "10px 5px",
          }}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00B4D8",
            color: "white",
            fontSize: "13px",
            width: "100px",
            height: "40px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
          onClick={() => setOpenModal(true)}
        >
          ADD
        </Button>
      </div>

      <Table sx={{ border: "1px solid gray" }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: "white",
                backgroundColor: "green",
                border: "1px solid gray",
                textAlign: "center",
                padding: "8px",
              }}
            >
              <strong>id</strong>
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                backgroundColor: "green",
                border: "1px solid gray",
                textAlign: "center",
                padding: "8px",
              }}
            >
              <strong>Name</strong>
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                backgroundColor: "green",
                border: "1px solid gray",
                textAlign: "center",
                padding: "8px",
              }}
            >
              <strong>Gender</strong>
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                backgroundColor: "green",
                border: "1px solid gray",
                textAlign: "center",
                padding: "8px",
              }}
            >
              <strong>Status</strong>
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                backgroundColor: "green",
                border: "1px solid gray",
                textAlign: "center",
              }}
            >
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data
              .filter((e) => {
                if (search) {
                  return e.name.toLowerCase().includes(search.toLowerCase());
                }
                return true;
              })
              .map((e) => (
                <TableRow key={e.id}>
                  <TableCell sx={{ color: "white", border: "1px solid gray" }}>
                    {e.id}
                  </TableCell>
                  <TableCell sx={{ color: "white", border: "1px solid gray" }}>
                    {e.name}
                  </TableCell>
                  <TableCell sx={{ color: "white", border: "1px solid gray" }}>
                    {e.gender}
                  </TableCell>
                  <TableCell sx={{ color: "white", border: "1px solid gray" }}>
                    <button className={e.status ? "active" : "inactive"}>
                      {e.status ? "Active" : "Inactive"}
                    </button>
                  </TableCell>
                  <TableCell sx={{ color: "white", border: "1px solid gray" }}>
                    <div
                      className="btns"
                      style={{ display: "flex", gap: "10px" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#00B4D8",
                          color: "white",
                          fontSize: "13px",
                          width: "20px",
                          height: "25px",
                          borderRadius: "5px",
                        }}
                        onClick={() => openEditModal(e)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => DeleteData(e.id)}
                        sx={{
                          backgroundColor: "red",
                          color: "white",
                          fontSize: "13px",
                          width: "20px",
                          height: "25px",
                          borderRadius: "5px",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <p>NOT FOUND</p>
          )}
        </TableBody>
      </Table>
      {openModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "25%",
            }}
          >
            <h2>Add New User</h2>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Gender"
              variant="outlined"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Age"
              variant="outlined"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={AddData}
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  fontSize: "13px",
                  width: "100px",
                  height: "40px",
                  borderRadius: "5px",
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {editopen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "25%",
            }}
          >
            <h2>Edit User</h2>
            <TextField
              label="Name"
              variant="outlined"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              label="Gender"
              variant="outlined"
              value={editGender}
              onChange={(e) => setEditGender(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={EditData}
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  fontSize: "13px",
                  width: "100px",
                  height: "40px",
                  borderRadius: "5px",
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
