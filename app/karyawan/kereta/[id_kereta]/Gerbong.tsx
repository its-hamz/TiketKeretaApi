import { GerbongType } from "../../types"
import AddSeat from "./addSeat"
import DeleteGerbong from "./deleteGerbong"
import EditGerbong from "./EditGerbong"
import EditSeat from "./editSeat"
import Seat from "./seat"

type props = {
    item: GerbongType
}

const Gerbong = (myProp: props) => {
    return (
        <div className="w-full my-2 bg-slate-50 rounded-md shadow-md flex flex-wrap justify-between">
            <div className="p-3">
                <small className="text-xs text-sky-600"> Nama Gerbong</small>
                <br />
                {myProp.item.name}
                <br />
                Jumlah Kursi: {myProp.item.seat_count}
                <div className="w-full my-2 flex flex-wrap items-center gap-3">
                    <AddSeat wagon_id={myProp.item.id} />
                    {
                        myProp.item.seats.length == 0 ?
                            <div className="bg-sky-200 p-5 rounded-md">
                                Gerbong ini belum memiliki kursi
                            </div> :
                            <div className="flex flex-wrap gap-3">
                                {
                                    myProp.item.seats.map((seat, index) => (
                                        <Seat key={`keySeat-${index}`} item={seat} />
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
            <div className="p-3 flex gap-3">
                <DeleteGerbong wagon={myProp.item} />
                <EditGerbong wagon={myProp.item} />

            </div>
        </div>
    )
}
export default Gerbong