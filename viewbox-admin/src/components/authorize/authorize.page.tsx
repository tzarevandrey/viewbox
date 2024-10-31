import { useGetAuthQuery } from "../../api/auth-api"

export const Authorize = () => {
    const {
        data
    } = useGetAuthQuery(0);
    console.log(data)
    return (
        <div>
            <div>LOADING</div>
            {data && <div>{data.expired?.toDateString()}</div>}
        </div>
    )
}