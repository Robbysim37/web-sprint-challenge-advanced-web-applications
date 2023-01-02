import React from "react"
import { render, screen } from '@testing-library/react'
import Spinner from "./Spinner"

test("Spinner is functional", () => {
    render(<Spinner on={true}/>)
    const styledSpinner = screen.queryByTitle("spinner")
})