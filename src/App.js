import React, { useEffect, useState } from "react";

function App() {
    // JS 부분
    const [pets, setPets] = useState(JSON.parse(localStorage.getItem("PetData")));
     // 처음 한번
    // useEffect(실행함수, [])
    // useEffect(() => {
    //     if(localStorage.getItem("PetData")) {
    //         setPets(JSON.parse(localStorage.getItem("PetData")));
    //     }
    // }, []);
    // pets 데이터가 수정될때마다 실행
    useEffect(() => {
        localStorage.setItem("PetData", JSON.stringify(pets));
    }, [pets]);
    // useEffect(실행함수, [pets])

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
                    return <Pet setPets={setPets} id={pet.id} name={pet.name} species={pet.species} age={pet.age} />;
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
        // alert("삭제버튼 클릭! 키값은 : " + props.id);
        // filter 메소드로 펫의 id값이 다를 경우에만 남긴다. (id값으로 삭제)
       props.setPets(prev => prev.filter((pet) => pet.id !== props.id));
    }
    return (
        <li>
            {props.name}은 {props.species} 이고, {props.age} 살 이다.
            <button onClick={handleDelete}>삭제</button>
        </li>
    );
}

function LikeArea() {
    const [likeCount, setLikeCount] = useState(JSON.parse(localStorage.getItem("LikeCount")));
    useEffect(() => {
        localStorage.setItem("LikeCount", JSON.stringify(likeCount));
    }, [likeCount]);

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
