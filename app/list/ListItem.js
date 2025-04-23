'use client'

import Link from "next/link";

export default function ListItem(props) {

    return (
        <div>
            {
                props.result.map((item, index) =>
                    <div className="list-item" key={index}>
                        <Link href={`/detail/${item._id}`}>
                            <h4>{item.title}</h4>
                        </Link>
                        <Link href={'/edit/' + item._id} className="list-btn">✏️</Link>
                        <span onClick={(e) => {
                            fetch('/api/post/delete', {
                                method: 'DELETE',
                                body: item._id
                            })
                                .then((r)=> r,json())
                                .then(() => {
                                    e.target.parentElement.style.opacity = 0;
                            })
                        }}>🗑️</span>
                        <p>{item.content}</p>
                    </div>
                )
            }
        </div>
    )
}
