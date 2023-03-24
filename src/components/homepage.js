import React, { useEffect, useState } from 'react';
import { Button, Form, Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { AsyncGetCurrentWeather, Async5DayForcast } from '../services/dataservices';
import { SaveToLocalStorageByCity, GetLocalStorage, RemoveFromLocalStorage } from '../localstorage/localstorage';
import './homepage.css';
import MorningIcon from '../assets/MorningIcon.png';
import AfternoonIcon from '../assets/AfternoonIcon.png';
import NightIcon from '../assets/NightIcon.png';

export default function HomePage() {
    const [isHome, setIsHome] = useState(true);
    const [cityInput, setCityInput] = useState('');
    const setInput = ({ target: { value } }) => setCityInput(value);

    const [weatherData, setWeatherData] = useState({});
    const [forecastData, setForecastData] = useState({});

    const [favortites, setFavorites] = useState([]);
    const [favortiteData] = useState([]);

    const GoHome = () => setIsHome(true);

    const [dayOfWeek, setDayOfWeek] = useState(1);

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const searchCity = async () => {
        setIsHome(false);
        setWeatherData(await AsyncGetCurrentWeather(cityInput));
        setForecastData(await Async5DayForcast(cityInput));
    }

    const searchFavorite = async (city) => favortiteData.push(await AsyncGetCurrentWeather(city));

    const saveToStorage = () => {
        SaveToLocalStorageByCity(weatherData?.name);
        setFavorites(GetLocalStorage());
    }

    const removeFromStorage = (city) => {
        RemoveFromLocalStorage(city);
        setFavorites(GetLocalStorage());
    }

    //useEffect(() => setFavorites(GetLocalStorage()), []);
    useEffect(() => {
        setFavorites(GetLocalStorage())
        const d = new Date();
        let day = d.getDay();
        setDayOfWeek(day);
    }, []);

    return (
        <div>
            <Navbar id='navbarColor' expand="lg">
                <Container fluid>
                    <Nav id='navTitle' onClick={GoHome}>Home</Nav>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search City" className="searchBar" aria-label="Search" onChange={setInput} />
                            <Button className='submitBtn' onClick={searchCity}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {
                isHome ? favortites.map((city, id) => {
                    searchFavorite(city);
                    return (
                        <div key={id}>
                            <Row>
                                <Col md={8} className='favDataCol'>
                                    <Row>
                                        <Col className='d-flex'>
                                            <h1>{Math.round(favortiteData[id]?.main?.temp)}</h1>
                                            <img className='favIcons' src={AfternoonIcon} alt='icon' />
                                        </Col>
                                        <Col>
                                            <h1>{city}</h1>
                                        </Col>
                                        <Col className='d-flex'>
                                            <h1>Low: {Math.round(favortiteData[id]?.main?.temp_min)}</h1>
                                        </Col>
                                        <Col className='d-flex'>
                                            <h1>High: {Math.round(favortiteData[id]?.main?.temp_max)}</h1>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Button className='removeBtn' onClick={() => removeFromStorage(city)}>Remove</Button>
                                </Col>
                            </Row>
                        </div>
                    )
                })
                    : (
                        <div className='forecastDiv'>
                            <Row className='infoSpacing'>
                                <Col>
                                    <Row className='currentInfoRow'>
                                        <Col className='d-flex'>
                                            <h1 className='currentInfoTxt'>{Math.round(weatherData?.main?.temp)}</h1>
                                            <img src={AfternoonIcon} alt='icon' />
                                            </Col>
                                        <Col><h1 className='currentInfoTxt'>{weatherData?.name}</h1></Col>
                                        <Col><h1 className='currentInfoTxt'>Low: {Math.round(weatherData?.main?.temp_min)}</h1></Col>
                                        <Col><h1 className='currentInfoTxt'>High: {Math.round(weatherData?.main?.temp_max)}</h1></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className='weekRow'>
                                <Col></Col>
                                <Col><h1>{weekdays[dayOfWeek]}</h1></Col>
                                <Col><h1>{weekdays[(dayOfWeek+1) > 6 ? dayOfWeek-6 : dayOfWeek+1 ]}</h1></Col>
                                <Col><h1>{weekdays[(dayOfWeek+2) > 6 ? dayOfWeek-5 : dayOfWeek+2 ]}</h1></Col>
                                <Col><h1>{weekdays[(dayOfWeek+3) > 6 ? dayOfWeek-4 : dayOfWeek+3 ]}</h1></Col>
                                <Col><h1>{weekdays[(dayOfWeek+4) > 6 ? dayOfWeek-3 : dayOfWeek+4 ]}</h1></Col>
                            </Row>

                            <div className='forecastInfoDiv'>
                                <Row className='forecastRows'>
                                    <Col><img src={MorningIcon} alt='morning' /></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[2]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[10]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[18]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[26]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[34]?.main?.temp)}</h1></Col>
                                </Row>
                                <Row className='forecastRows'>
                                    <Col><img src={AfternoonIcon} alt='afternoon' /></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[4]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[12]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[20]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[28]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[36]?.main?.temp)}</h1></Col>
                                </Row>
                                <Row>
                                    <Col><img src={NightIcon} alt='Evening' /></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[6]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[14]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[22]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[30]?.main?.temp)}</h1></Col>
                                    <Col><h1 className='forecastTemps'>{Math.round(forecastData?.list?.[38]?.main?.temp)}</h1></Col>
                                </Row>
                            </div>
                            <Row>
                                <Col className='d-flex justify-content-center mt-5'>
                                    <Button className='favBtn' onClick={saveToStorage}>Add To Favorites</Button>
                                </Col>
                            </Row>
                        </div>
                    )
            }
        </div>
    );
}