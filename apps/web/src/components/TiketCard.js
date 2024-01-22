'use client'

import { useEffect } from "react"
import { IoTerminal } from "react-icons/io5"
import { useState } from "react"

import {formatRupiah} from "../lib/formatRupiah"
export default function TiketCard(props){
    return (
        <div>
            <div className="card w-full bg-blue-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{props.item.category}</h2>
                    <p className="text-lg">Purchased Ticket can't be Refunded</p>
                    <div className="card-actions justify-between border-t py-2 border-blue-500 border-dotted">
                        <div>
                        <div>{formatRupiah(props.item.price)}</div>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                        <button className="btn btn-primary" onClick={() => props.onSelect(props.item, '-')}>-</button>
                        {
                            props.stat[props.item.id]?.quota?
                                props.stat[props.item.id]?.quota
                            :
                                0
                        }
                        <button className="btn btn-primary" onClick={() => props.onSelect(props.item, '+')}>+</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div> 
    );
}