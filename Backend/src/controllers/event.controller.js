import Event from '../models/event.model.js'
export async function listEvents(req, res, next) { try { const filter = { isActive: true }; if (req.query.city) filter.city = req.query.city; if (req.query.type) filter.type = req.query.type; res.json(await Event.find(filter).sort({ startsAt: 1 })) } catch (error) { next(error) } }
export async function getEvent(req, res, next) { try { const event = await Event.findOne({ _id: req.params.id, isActive: true }); if (!event) return res.status(404).json({ message: 'Event not found' }); res.json(event) } catch (error) { next(error) } }
export async function createEvent(req, res, next) { try { res.status(201).json(await Event.create(req.body)) } catch (error) { next(error) } }
export async function updateEvent(req, res, next) { try { res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })) } catch (error) { next(error) } }
