import Theatre from '../models/theatre.model.js'
import Screen from '../models/screen.model.js'
export async function listTheatres(req, res, next) { try { const filter = { isActive: true }; if (req.query.city) filter.city = req.query.city; res.json(await Theatre.find(filter).sort({ name: 1 })) } catch (error) { next(error) } }
export async function getTheatre(req, res, next) { try { const theatre = await Theatre.findById(req.params.id); if (!theatre) return res.status(404).json({ message: 'Theatre not found' }); const screens = await Screen.find({ theatre: theatre._id }); res.json({ ...theatre.toObject(), screens }) } catch (error) { next(error) } }
export async function createTheatre(req, res, next) { try { res.status(201).json(await Theatre.create(req.body)) } catch (error) { next(error) } }
export async function createScreen(req, res, next) { try { res.status(201).json(await Screen.create({ ...req.body, theatre: req.params.theatreId })) } catch (error) { next(error) } }
