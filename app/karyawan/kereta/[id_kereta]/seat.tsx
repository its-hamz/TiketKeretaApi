import { GerbongType, KursiType } from "../../types"
import AddSeat from "./addSeat"
import DeleteSeat from "./deleteSeat"
import EditSeat from "./editSeat"

type props = {
    item: KursiType,
}
const Seat = (myProp: props) => {
    return (
        <div className="size-20 rounded-md flex flex-col items-center justify-center bg-sky-700">
            <div>
                <span className="text-white font-semibold">
                    {myProp.item.seat_number}
                </span>
            </div>
            <div className="flex gap-1">
                <EditSeat seat={myProp.item} />
                <DeleteSeat seat={myProp.item} />
            </div>
        </div>

    )
}
export default Seat