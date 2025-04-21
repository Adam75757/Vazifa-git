import {Router} from "express"
import controller from "../controller/index.js"

const router=Router()
router
    .get("/api/students",controller.GET)
    .get("/api/students/:id",controller.GET_ID)
    .post("/api/students",controller.POST)
    .put("/api/students",controller.PUT)
    .delete("/api/students",controller.DELETE)
    
export default router
