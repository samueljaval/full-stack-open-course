import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const FeedBack = ({good_f, neutral_f, bad_f}) => {
    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick = {good_f} text = "good"/>
            <Button onClick = {neutral_f} text = "neutral"/>
            <Button onClick = {bad_f} text = "bad"/>
            <p> </p>
        </div>
    )
}

const Statistic = ({text, value}) => {

    if (text === "positive") {
        return (
            <tr>
                <td>{text}</td>
                <td>{value} % </td>
            </tr>
        )
    }
    else {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        )
    }
}

const Statistics = ({good, neutral, bad}) => {

    const all = good + neutral + bad
    if (all === 0){
        return(
            <div>No feedback given</div>
        )
    }
    else {
        const avg = (good + bad*(-1)) / all
        const pos = (good/all) * 100
        return(
            <table>
                <tbody>
                    <Statistic text="good" value ={good} />
                    <Statistic text="neutral" value ={neutral} />
                    <Statistic text="bad" value ={bad} />
                    <Statistic text="all" value ={all} />
                    <Statistic text="average" value ={avg} />
                    <Statistic text="positive" value ={pos}/>
                </tbody>
            </table>
        )
    }
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addone = (which, which_fun) => {
        const addone_helper = () => which_fun(which + 1)
        return addone_helper
    }

    const all_adds = {
        good : addone(good, setGood),
        neutral : addone(neutral, setNeutral),
        bad : addone(bad, setBad)
    }

    return (
        <div>
            <FeedBack good_f = {all_adds.good}
                      neutral_f = {all_adds.neutral}
                      bad_f = {all_adds.bad}/>
            <Statistics good = {good}
                   neutral = {neutral}
                   bad = {bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
