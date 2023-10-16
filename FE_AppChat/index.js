const socket = io("ws://localhost:8080");

// client-side
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
    console.log(socket.id); // undefined
});

const btnSend = document.querySelector("#btn-send");
const room_1 = document.querySelector("#room-1");
const room_2 = document.querySelector("#room-2");
const room_3 = document.querySelector("#room-3");

btnSend.onclick = () => {
    let mess = document.querySelector("#txt-send").value;
    let uName = localStorage.getItem("user");

    socket.emit("send-data", { mess, uName, room: localStorage.getItem("room") });
};

socket.on("send-data", (data) => {
    document.querySelector("#txt-send").value = ""

    console.log(data); // undefined
});

document.querySelector("#btn-name").onclick = () => {
    let uName = document.querySelector("#txt-name").value;
    localStorage.setItem("user", uName);

    $("#myModal").modal("hide");
};

room_1.onclick = () => {
    localStorage.setItem("room", "room-1");

    socket.emit("join", "room-1");

    document.querySelector("#title-room").innerHTML = "Room 1";

    document.querySelector("#noiDung").innerHTML = "";
};

room_2.onclick = () => {
    localStorage.setItem("room", "room-2");
    socket.emit("join", "room-2");

    document.querySelector("#title-room").innerHTML = "Room 2";
    document.querySelector("#noiDung").innerHTML = "";
};
room_3.onclick = () => {
    localStorage.setItem("room", "room-3");

    socket.emit("join", "room-3");

    document.querySelector("#title-room").innerHTML = "Room 3";
    document.querySelector("#noiDung").innerHTML = "";
};

socket.on("send-data", (data) => {
    let uName = localStorage.getItem("user");
    let noiDung = "";

    if (uName == data.uName) {
        noiDung = `
        <li class="clearfix">
        <div class="message-data text-right">
            <span class="message-data-time">${data.uName}</span>
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
        </div>
        <div class="message other-message float-right">${data.mess} </div>
    </li>
        `;
    } else {
        noiDung = `
        <li class="clearfix">
        <div class="message-data">
            <span class="message-data-time">${data.uName}</span>
        </div>
        <div class="message my-message">${data.mess}</div>
    </li>
        `;
    }

    document.querySelector("#noiDung").innerHTML += noiDung;
});
