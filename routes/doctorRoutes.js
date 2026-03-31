const router = require('express').Router();
const ctrl = require('../controllers/doctorController');


router.post('/', ctrl.createDoctor);
router.get('/',ctrl.getDoctors);
router.get('/:id',ctrl.getDoctor);
router.put('/:id',ctrl.updateDoctor);
router.delete('/:id',ctrl.deleteDoctor);

module.exports = router;
