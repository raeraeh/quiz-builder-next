import React from "react";

// depending on the block type, this informs the the content that is displayed on the page

// block component takes what props?
// content type (text field , ?? ), content data
// text field: label, placeholder, value
export default function Counter() {
  const [count, setCount] = useState(0)
  const inrement = () => setCount(count + 1)
  return (
    <>

    {}
    </>
  )
}