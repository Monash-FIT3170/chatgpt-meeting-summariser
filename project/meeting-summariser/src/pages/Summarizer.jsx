import { Button } from '../components'
import {DoneButton} from '../components'
import {BackButton} from '../components'
import { Navbar } from "../components"
import { SummariseButton } from "../components"

import './Page.css'


const Summarizer = () => {
    return (
        <>
            <Navbar title={"Summarizer"}></Navbar>
            <nav className='page'>
                <Button></Button>
                <DoneButton></DoneButton>
                <BackButton></BackButton>
                <SummariseButton></SummariseButton>
            </nav>

        </>
    )
}

export default Summarizer