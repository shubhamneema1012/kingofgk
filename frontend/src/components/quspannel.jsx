import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Stack } from 'react-bootstrap'

function Quspannel() {
    const [data, setdata] = useState({});
  const [loading, setloading] = useState(true);
  const [answerd, setanswerd] = useState(false);
  const [time, setTime] = useState(20);
  const [answerstatus, setanswerstatus] = useState("notanswered");
  const [pressed, setpressed] = useState("noanswered");



  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

//   useEffect(() => {
//     fetchData(); // Initial fetch

//     const interval = setInterval(() => {
//       fetchData();
//     }, 20000);
//     const timerInterval = setInterval(() => {
//         setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//       }, 1000);

//       return () => {
//         clearInterval(interval);
//         clearInterval(timerInterval);
//       };

//   }, []);

  const fetchData = () => {
    setloading(true);
    setanswerd(false);
    fetch('http://localhost:5000/api/items')
      .then(response => response.json())
      .then(data => {
        setloading(false);
        setTime(20)
        setdata(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setloading(false);
      });
  };
  const giveanswer = (answer) => {
    setanswerd(true);
      fetch('http://localhost:5000/api/giveanswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({answer:answer})
      })
        .then(response => response.json())
        .then(data => {
            setanswerstatus({status:data.data,answer:answer})
            setTimeout(() => {
                fetchData()
            }, 5000);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setloading(false);
        });
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  return (
    <Row>
          <Col style={{ border: '2px solid black', padding: '50px 30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Stack gap={3}>
              <Row>
                <p className='fs-3 text-center'>{time}</p>
              </Row>
              <Row>
                <p className='fs-3 text-center'>{data.question}</p>
              </Row>
              <Row>
                <Row className="mb-2">
                  <Col xs={6}>
                    <Button onClick={()=>giveanswer(data.options[0])} disabled={answerd}  variant={(answerstatus.status == "correct" && answerstatus.answer == data.options[0]) ? "primary" : (answerstatus.status == "incorrect" && answerstatus.answer == data.options[0]) ? "danger" : "dark" } className="w-100">{data.options[0]}</Button>
                  </Col>
                  <Col xs={6}>
                    <Button onClick={()=>giveanswer(data.options[1])} disabled={answerd}  variant={(answerstatus.status == "correct" && answerstatus.answer == data.options[1]) ? "primary" : (answerstatus.status == "incorrect" && answerstatus.answer == data.options[1]) ? "danger" : "dark" } className="w-100">{data.options[1]}</Button>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={6}>
                    <Button onClick={()=>giveanswer(data.options[2])} disabled={answerd}  variant={(answerstatus.status == "correct" && answerstatus.answer == data.options[2]) ? "primary" : (answerstatus.status == "incorrect" && answerstatus.answer == data.options[2]) ? "danger" : "dark" } className="w-100">{data.options[2]}</Button>
                  </Col>
                  <Col xs={6}>
                    <Button onClick={()=>giveanswer(data.options[3])} disabled={answerd} variant={(answerstatus.status == "correct" && answerstatus.answer == data.options[3]) ? "primary" : (answerstatus.status == "incorrect" && answerstatus.answer == data.options[3]) ? "danger" : "dark" } className="w-100">{data.options[3]}</Button>
                  </Col>
                </Row>
              </Row>
            </Stack>
          </Col>
        </Row>
  )
}

export default Quspannel