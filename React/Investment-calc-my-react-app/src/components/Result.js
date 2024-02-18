import { calculateInvestmentResults } from "../util/investment"

export default function Result({investObj}){
    let sum = 0

    return(
        <>
            <thead>
                <tr>
                    <td>Year</td>
                </tr>
                <tr>
                    <td>Investment Value</td>
                </tr>
                <tr>
                    <td>Interest (Year)</td>
                </tr>
                <tr>
                    <td>Total Interest</td>
                </tr>
                <tr>
                    <td>Invested Capital</td>
                </tr>
            </thead>

            <tbody>
                {
                    calculateInvestmentResults(investObj).map(entry => {
                        sum += entry.interest
                        let investedCap = parseInt(investObj.initial) + parseInt(entry.year*investObj.annual)
                        console.log(investObj)
                        return(
                            <tr key={entry.year}>
                                <td>{entry.year}</td>
                                <td>{entry.valueEndOfYear}</td>
                                <td>{entry.interest}</td>
                                <td>{sum}</td>
                                <td>{investedCap}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </>
    )
}