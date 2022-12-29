import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Account.css";

const Account = () => {
  const { currentUser } = useAuth();

  return (
    <section className="account-section">
      <table className="account-table">
        <tbody>
          <tr className="table-row">
            <td className="table-data">Email</td>
            <td className="table-data">{currentUser.email}</td>
          </tr>
          <tr className="table-row">
            <td className="table-data">Nazwa użytkownika</td>
            <td className="table-data">{currentUser.username}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Account;
