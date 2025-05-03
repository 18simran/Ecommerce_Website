import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import "../../styles/Admin.css";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid  p-3">
        <div className="row offset-md-1">
          <div className="col-md-3 ">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <p>
                <span> Admin Name : </span>&nbsp; {auth?.user?.name}
              </p>
              <p>
                {" "}
                <span>Admin Email :</span>&nbsp; {auth?.user?.email}
              </p>
              <p>
                {" "}
                <span>Admin Contact :</span>&nbsp; {auth?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
