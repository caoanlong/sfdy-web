import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import Member from "../../types/Member"

function Mine() {
    const member: Member = useSelector((state: RootState) => state.member)
    return (
        <div>
            <div className="w-20 h-20 text-6xl text-center overflow-hidden rounded-full bg-gray-200 mx-auto mt-8">
                {
                    member.avatar ? 
                    <img src={process.env.img_url + member.avatar} alt="" /> :
                    <FontAwesomeIcon 
                        className="text-gray-400 mt-6" 
                        icon={faUser}
                    />
                }
            </div>
            <div className="text-center mt-2">
                {
                    member.memberName ? <p><span>名称：</span>{member.memberName}</p> : <></>
                }
                {
                    member.mobile ? <p><span>手机：</span>{member.mobile}</p> : <></>
                }
                {
                    member.email ? <p><span>邮箱：</span>{member.email}</p> : <></>
                }
            </div>
            <div className="mt-4 px-4 break-words text-center">
                <span>推广链接：</span>
                <span className="bg-purple-500 text-white text-sm px-4 py-1 rounded sm:hidden">复制链接</span>
                <span className="text-blue-500">{process.env.site_url + '/register/' + member.randomCode}</span>
                <span className="bg-purple-500 text-white text-sm px-4 py-1 rounded hidden sm:inline-block ml-2">复制链接</span>
            </div>
        </div>
    )
}

export default Mine