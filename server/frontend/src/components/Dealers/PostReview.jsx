import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
    const [dealer, setDealer] = useState({});
    const [review, setReview] = useState("");
    const [model, setModel] = useState();
    const [year, setYear] = useState("");
    const [date, setDate] = useState("");
    const [carmodels, setCarmodels] = useState([]); // State for car models
    const [cars, setCars] = useState([]); // State for cars

    let curr_url = window.location.href;
    let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
    let params = useParams();
    let id = params.id;
    let dealer_url = root_url + `djangoapp/dealer/${id}`;
    let review_url = root_url + `djangoapp/add_review`;
    let carmodels_url = root_url + `djangoapp/get_cars`;

    const postreview = async () => {
        let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
        //If the first and second name are stores as null, use the username
        if (name.includes("null")) {
            name = sessionStorage.getItem("username");
        }
        if (!model || review === "" || date === "" || year === "" || model === "") {
            alert("All details are mandatory")
            return;
        }

        let model_split = model.split(" ");
        let make_chosen = model_split[0];
        let model_chosen = model_split[1];

        let jsoninput = JSON.stringify({
            "name": name,
            "dealership": id,
            "review": review,
            "purchase": true,
            "purchase_date": date,
            "car_make": make_chosen,
            "car_model": model_chosen,
            "car_year": year,
        });

        console.log(jsoninput);
        const res = await fetch(review_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsoninput,
        });

        const json = await res.json();
        if (json.status === 200) {
            window.location.href = window.location.origin + "/dealer/" + id;
        }
    }

    const get_dealer = async () => {
        const res = await fetch(dealer_url, {
            method: "GET"
        });
        const retobj = await res.json();

        if (retobj.status === 200) {
            let dealerobjs = Array.from(retobj.dealer)
            if (dealerobjs.length > 0)
                setDealer(dealerobjs[0])
        }
    }

    const get_cars = async () => {
        const cars_url = `${root_url}djangoapp/cars/dealer/${id}/`;        ;
        try {
            const res = await fetch(cars_url);
            
            // Check if the response is ok
            if (!res.ok) {
                const text = await res.text(); // Get the response as text
                throw new Error(`HTTP error! Status: ${res.status}, Response: ${text}`);
            }
    
            const retobj = await res.json();
            console.log('Fetched car data:', retobj);
            
            if (retobj.status === 200) {
                setCarmodels(retobj.cars);
            } else {
                console.error("Failed to fetch cars:", retobj);
            }
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };
    
    
    
    

    useEffect(() => {
        get_dealer();
        get_cars();
    }, [id]);

    return (
        <div>
            <Header />
            <div style={{ margin: "5%" }}>
                <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>
                <textarea id='review' cols='50' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>
                <div className='input_field'>
                    Purchase Date <input type="date" onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className='input_field'>
                    Car Make 
                    <select name="cars" id="cars" onChange={(e) => setModel(e.target.value)}>
                        <option value="" selected disabled hidden>Choose Car Make and Model</option>
                        <option value="SEDAN" >SEDAN</option>
                        <option value="NISSAN XTRAIL" >NISSAN XTRAIL</option>
                        {carmodels.map(carmodel => (
                            <option key={carmodel.id} value={`${carmodel.CarMake} ${carmodel.CarModel}`}>
                                {carmodel.CarMake} {carmodel.CarModel}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='input_field'>
                    Car Year <input type="number" onChange={(e) => setYear(e.target.value)} max={2023} min={2015} />
                </div>

                <div>
                    <button className='postreview' onClick={postreview}>Post Review</button>
                </div>
            </div>
        </div>
    )
}

export default PostReview;
