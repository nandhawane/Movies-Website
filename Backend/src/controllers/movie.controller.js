import Movie from '../models/movie.model.js'
export async function listMovies(req, res, next) { try { const filter = { isActive: true }; if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' }; if (req.query.language) filter.language = req.query.language; res.json(await Movie.find(filter).sort({ releaseDate: -1 })) } catch (error) { next(error) } }
export async function getMovie(req, res, next) { try { const movie = await Movie.findById(req.params.id); if (!movie) return res.status(404).json({ message: 'Movie not found' }); res.json(movie) } catch (error) { next(error) } }
export async function createMovie(req, res, next) { try { res.status(201).json(await Movie.create(req.body)) } catch (error) { next(error) } }
export async function updateMovie(req, res, next) { try { res.json(await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })) } catch (error) { next(error) } }
export async function deleteMovie(req, res, next) { try { await Movie.findByIdAndUpdate(req.params.id, { isActive: false }); res.json({ message: 'Movie removed' }) } catch (error) { next(error) } }
