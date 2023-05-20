import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Applicants from "../page/Applicants";
import Navbar from "../component/Navbar";
import Jobs from "../page/Jobs";
import Auth from "../page/Auth";
import PrivateRoute from "../page/PrivateRoute";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Auth />
              <div>
                <h5>หมายเหตุ</h5>
                <ul>
                  <li>
                    หากต้องการ log in ในบทบาท admin ให้ใช้ email :
                    admin@tofu.com password: admin
                  </li>
                  <li>
                    หากต้องการ log in ในบทบาท user สามารถ register ได้ปกติ
                  </li>
                  <li>หน้า applicants สามารถดูได้แค่ admin</li>
                  <li>admin สามารถเพิ่ม job ได้ ไม่สามารถ apply job ได้</li>
                  <li>user สามารถ apply job ได้ ไม่สามารถเพิ่ม job ได้</li>
                  <li>
                    หน้า applicants ยังไม่สามารถ edit ผู้สมัครได้ delete
                    ได้อย่างเดียว
                  </li>
                  <li>
                    ระบบ export CSV ได้ในหน้า applicants
                    แต่ยังไม่ใช่ข้อมูลผู้สมัครจริง
                  </li>
                </ul>
              </div>
            </>
          }
        />
        <Route path="jobs" element={<Jobs />} />
        <Route path="applicants" element={<Applicants />} />
      </Routes>
    </Router>
  );
}

export default App;
