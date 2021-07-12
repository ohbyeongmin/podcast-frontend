import React from "react";
import { v4 as uuidv4 } from "uuid";

type TypeListener = {
    email: string;
};

interface IListeners {
    listeners: TypeListener[];
}

export const DashboardListeners: React.FC<IListeners> = ({ listeners }) => {
    return (
        <div className="p-10 flex justify-center flex-wrap">
            {listeners &&
                listeners.map((listener) => {
                    return (
                        <div
                            key={uuidv4()}
                            className="max-w-min px-3 py-1 flex items-center rounded-full m-5 "
                            style={{
                                background: `hsla(${~~(
                                    360 * Math.random()
                                )},70%,70%,1)`,
                            }}
                        >
                            {listener.email}
                        </div>
                    );
                })}
            {listeners && listeners.length === 0 && <div>No Listener yet</div>}
        </div>
    );
};
