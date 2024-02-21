import { calculateInvestmentResults, formatter } from "../util/investment"

export default function Result({investObj}){
    let sum = 0

    return(
        <>
            <thead>
                <tr>
                    <td>Year</td>
                    <td>Investment Value</td>
                    <td>Interest (Year)</td>
                    <td>Total Interest</td>
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
                                <td>{formatter.format(entry.valueEndOfYear)}</td>
                                <td>{formatter.format(entry.interest)}</td>
                                <td>{formatter.format(sum)}</td>
                                <td>{formatter.format(investedCap)}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </>
    )
}