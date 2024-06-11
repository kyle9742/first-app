import React, { useState } from "react";

function App() {
    // JS 부분
    const [pets, setPets] = useState([
        { name: "줄리아", species: "cat", age: "5", id: 123456789 },
        { name: "라이언", species: "dog", age: "3", id: 987654321 },
        { name: "플로피", species: "rabbit", age: "2", id: 123123123 },
        { name: "길동", species: "cat", age: "1", id: 456456456 },
        { name: "진도", species: "dog", age: "6", id: 789789789 },
    ]);

    return (
        <div>
            <OurHeader />
            <TimeArea />
            <p>Function 밖의 현재 시간 : {new Date().toLocaleString()}</p>
            <hr />
            <h1>props 를 통해 데이터 넣기</h1>
            <ul>
                <Pet name="라이언" species="cat" age="5" />
                <Pet name="울버린" species="dog" age="2" />
                <Pet name="토끼" species="rabbit" age="3" />
            </ul>
            <hr />
            <h1>배열 만들어 데이터 가져오기</h1>
            <ul>
                {pets.map((pet) => {
                    return <Pet key={pet.id} name={pet.name} species={pet.species} age={pet.age} />;
                })}
            </ul>
            <hr />
            <h1>이벤트 처리</h1>
            <LikeArea />
            <Footer name="부산IT교육센터" />
            <hr/>
            <h1>Form 추가 이벤트</h1>
            <AddPetForm setPets={setPets}/>
        </div>
    );
}

function OurHeader() {
    return <h1 className="special">처음 앱</h1>;
}
function TimeArea() {
    const [time, setTime] = useState(new Date().toLocaleString());

    setTimeout(function () {
        setTime(new Date().toLocaleString());
    }, 1000);

    return (
        <div>
            <p>Function 안의 현재 시간 : {time}.</p>
        </div>
    );
}
function Footer(props) {
    return <small>@카피라이트 : {props.name}</small>;
}
function Pet(props) {
    function handleDelete() {
        alert("삭제버튼 클릭! 키값은 : " + props.id);
    //    props.setPets(prev => prev.filter(pet => pet.id !== props.key));
    }
    return (
        <li>
            {props.name}은 {props.species} 이고, {props.age} 살 이다.
            <button onClick={handleDelete}>삭제</button>
        </li>
    );
}
function LikeArea() {
    const [likeCount, setLikeCount] = useState(0);

    function upLike() {
        setLikeCount((prev) => prev + 1);
    }
    function downLike() {
        if (likeCount > 0) setLikeCount((prev) => prev - 1);
    }

    return (
        <div>
            <button onClick={upLike}>추천하기</button>
            <button onClick={downLike}>비추하기</button>
            <h4>이 페이지를 {likeCount}번 추천 했습니다.</h4>
        </div>
    );
}
function AddPetForm(props) {
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        props.setPets(prev => prev.concat({name : name, species:species, age:age, id:new Date()}));
        

        setName("");
        setSpecies("");
        setAge("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>새 PET 을 추가하기</legend>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="이름" />
                <input value={species} onChange={e => setSpecies(e.target.value)} placeholder="종류" />
                <input value={age} onChange={e => setAge(e.target.value)} placeholder="나이" />
                <button>펫 추가</button>
            </fieldset>
        </form>
    );
}
export default App;
