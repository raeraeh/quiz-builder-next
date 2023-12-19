import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <form>
      <label htmlFor="name">name</label>
      <input
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      ></input>

      <label htmlFor="email"></label>
      <input
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      ></input>
    </form>
  );
}
