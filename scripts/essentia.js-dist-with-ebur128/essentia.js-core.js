var Essentia = function () {
	"use strict";
	/*
	 * Copyright (C) 2006-2020  Music Technology Group - Universitat Pompeu Fabra
	 *
	 * This file is part of Essentia
	 *
	 * Essentia is free software: you can redistribute it and/or modify it under
	 * the terms of the GNU Affero General Public License as published by the Free
	 * Software Foundation (FSF), either version 3 of the License, or (at your
	 * option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful, but WITHOUT
	 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
	 * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
	 * details.
	 *
	 * You should have received a copy of the Affero GNU General Public License
	 * version 3 along with this program.  If not, see http://www.gnu.org/licenses/
	 */
	function o(o, t) {
		var i, r, e, n, d = {
			label: 0,
			sent: function () {
				if (1 & e[0]) throw e[1];
				return e[1]
			},
			trys: [],
			ops: []
		};
		return n = {
			next: v(0),
			throw: v(1),
			return: v(2)
		}, "function" == typeof Symbol && (n[Symbol.iterator] = function () {
			return this
		}), n;

		function v(n) {
			return function (v) {
				return function (n) {
					if (i) throw new TypeError("Generator is already executing.");
					for (; d;) try {
						if (i = 1, r && (e = 2 & n[0] ? r.return : n[0] ? r.throw || ((e = r.return) && e.call(r), 0) : r.next) && !(e = e.call(r, n[1])).done) return e;
						switch (r = 0, e && (n = [2 & n[0], e.value]), n[0]) {
							case 0:
							case 1:
								e = n;
								break;
							case 4:
								return d.label++, {
									value: n[1],
									done: !1
								};
							case 5:
								d.label++, r = n[1], n = [0];
								continue;
							case 7:
								n = d.ops.pop(), d.trys.pop();
								continue;
							default:
								if (!(e = d.trys, (e = e.length > 0 && e[e.length - 1]) || 6 !== n[0] && 2 !== n[0])) {
									d = 0;
									continue
								}
								if (3 === n[0] && (!e || n[1] > e[0] && n[1] < e[3])) {
									d.label = n[1];
									break
								}
								if (6 === n[0] && d.label < e[1]) {
									d.label = e[1], e = n;
									break
								}
								if (e && d.label < e[2]) {
									d.label = e[2], d.ops.push(n);
									break
								}
								e[2] && d.ops.pop(), d.trys.pop();
								continue
						}
						n = t.call(o, d)
					} catch (o) {
						n = [6, o], r = 0
					} finally {
						i = e = 0
					}
					if (5 & n[0]) throw n[1];
					return {
						value: n[0] ? n[1] : void 0,
						done: !0
					}
				}([n, v])
			}
		}
	}
	return function () {
		function t(o, t) {
			void 0 === t && (t = !1), this.EssentiaModule = o, this.isDebug = t, this.algorithms = new o.EssentiaJS(t), this.module = o, this.version = this.algorithms.version, this.algorithmNames = this.algorithms.algorithmNames
		}
		return t.prototype.getAudioChannelDataFromURL = function (t, i, r) {
			return void 0 === r && (r = 0), e = this, n = void 0, v = function () {
				var e;
				return o(this, (function (o) {
					switch (o.label) {
						case 0:
							return [4, fetch(t)];
						case 1:
							return [4, o.sent().arrayBuffer()];
						case 2:
							return e = o.sent(), [4, i.decodeAudioData(e)];
						case 3:
							return [2, o.sent().getChannelData(r)]
					}
				}))
			}, new((d = void 0) || (d = Promise))((function (o, t) {
				function i(o) {
					try {
						s(v.next(o))
					} catch (o) {
						t(o)
					}
				}

				function r(o) {
					try {
						s(v.throw(o))
					} catch (o) {
						t(o)
					}
				}

				function s(t) {
					t.done ? o(t.value) : new d((function (o) {
						o(t.value)
					})).then(i, r)
				}
				s((v = v.apply(e, n || [])).next())
			}));
			var e, n, d, v
		}, t.prototype.shutdown = function () {
			this.algorithms.shutdown()
		}, t.prototype.reinstantiate = function () {
			this.algorithms = new this.module.EssentiaJS(this.isDebug)
		}, t.prototype.arrayToVector = function (o) {
			return this.module.arrayToVector(o)
		}, t.prototype.vectorToArray = function (o) {
			return this.module.vectorToArray(o)
		}, t.prototype.FrameGenerator = function (o, t, i) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 1024), this.algorithms.FrameGenerator(o, t, i)
		}, t.prototype.LoudnessEBUR128 = function (o, t, i, r, e) {
			return void 0 === i && (i = .1), void 0 === r && (r = 44100), void 0 === e && (e = !1), this.algorithms.LoudnessEBUR128(o, t, i, r, e)
		}, t.prototype.AfterMaxToBeforeMaxEnergyRatio = function (o) {
			return this.algorithms.AfterMaxToBeforeMaxEnergyRatio(o)
		}, t.prototype.AllPass = function (o, t, i, r, e) {
			return void 0 === t && (t = 500), void 0 === i && (i = 1500), void 0 === r && (r = 1), void 0 === e && (e = 44100), this.algorithms.AllPass(o, t, i, r, e)
		}, t.prototype.AudioOnsetsMarker = function (o, t, i, r) {
			void 0 === t && (t = []), void 0 === i && (i = 44100), void 0 === r && (r = "beep");
			for (var e = new this.module.VectorFloat, n = 0; n < e.size(); n++) e.push_back(t[n]);
			return this.algorithms.AudioOnsetsMarker(o, e, i, r)
		}, t.prototype.AutoCorrelation = function (o, t, i, r) {
			return void 0 === t && (t = .5), void 0 === i && (i = !1), void 0 === r && (r = "standard"), this.algorithms.AutoCorrelation(o, t, i, r)
		}, t.prototype.BFCC = function (o, t, i, r, e, n, d, v, s, a, u, p, h) {
			return void 0 === t && (t = 2), void 0 === i && (i = 11e3), void 0 === r && (r = 1025), void 0 === e && (e = 0), void 0 === n && (n = "dbamp"), void 0 === d && (d = 0), void 0 === v && (v = "unit_sum"), void 0 === s && (s = 40), void 0 === a && (a = 13), void 0 === u && (u = 44100), void 0 === p && (p = "power"), void 0 === h && (h = "warping"), this.algorithms.BFCC(o, t, i, r, e, n, d, v, s, a, u, p, h)
		}, t.prototype.BPF = function (o, t, i) {
			void 0 === t && (t = [0, 1]), void 0 === i && (i = [0, 1]);
			for (var r = new this.module.VectorFloat, e = 0; e < r.size(); e++) r.push_back(t[e]);
			var n = new this.module.VectorFloat;
			for (e = 0; e < n.size(); e++) n.push_back(i[e]);
			return this.algorithms.BPF(o, r, n)
		}, t.prototype.BandPass = function (o, t, i, r) {
			return void 0 === t && (t = 500), void 0 === i && (i = 1500), void 0 === r && (r = 44100), this.algorithms.BandPass(o, t, i, r)
		}, t.prototype.BandReject = function (o, t, i, r) {
			return void 0 === t && (t = 500), void 0 === i && (i = 1500), void 0 === r && (r = 44100), this.algorithms.BandReject(o, t, i, r)
		}, t.prototype.BarkBands = function (o, t, i) {
			return void 0 === t && (t = 27), void 0 === i && (i = 44100), this.algorithms.BarkBands(o, t, i)
		}, t.prototype.BeatTrackerDegara = function (o, t, i) {
			return void 0 === t && (t = 208), void 0 === i && (i = 40), this.algorithms.BeatTrackerDegara(o, t, i)
		}, t.prototype.BeatTrackerMultiFeature = function (o, t, i) {
			return void 0 === t && (t = 208), void 0 === i && (i = 40), this.algorithms.BeatTrackerMultiFeature(o, t, i)
		}, t.prototype.Beatogram = function (o, t, i) {
			return void 0 === i && (i = 16), this.algorithms.Beatogram(o, t, i)
		}, t.prototype.BeatsLoudness = function (o, t, i, r, e, n) {
			void 0 === t && (t = .05), void 0 === i && (i = .1), void 0 === r && (r = []), void 0 === e && (e = [20, 150, 400, 3200, 7e3, 22e3]), void 0 === n && (n = 44100);
			for (var d = new this.module.VectorFloat, v = 0; v < d.size(); v++) d.push_back(r[v]);
			var s = new this.module.VectorFloat;
			for (v = 0; v < s.size(); v++) s.push_back(e[v]);
			return this.algorithms.BeatsLoudness(o, t, i, d, s, n)
		}, t.prototype.BinaryOperator = function (o, t, i) {
			return void 0 === i && (i = "add"), this.algorithms.BinaryOperator(o, t, i)
		}, t.prototype.BinaryOperatorStream = function (o, t, i) {
			return void 0 === i && (i = "add"), this.algorithms.BinaryOperatorStream(o, t, i)
		}, t.prototype.BpmHistogramDescriptors = function (o) {
			return this.algorithms.BpmHistogramDescriptors(o)
		}, t.prototype.BpmRubato = function (o, t, i, r) {
			return void 0 === t && (t = 20), void 0 === i && (i = 4), void 0 === r && (r = .08), this.algorithms.BpmRubato(o, t, i, r)
		}, t.prototype.CentralMoments = function (o, t, i) {
			return void 0 === t && (t = "pdf"), void 0 === i && (i = 1), this.algorithms.CentralMoments(o, t, i)
		}, t.prototype.Centroid = function (o, t) {
			return void 0 === t && (t = 1), this.algorithms.Centroid(o, t)
		}, t.prototype.ChordsDescriptors = function (o, t, i) {
			return this.algorithms.ChordsDescriptors(o, t, i)
		}, t.prototype.ChordsDetection = function (o, t, i, r) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 44100), void 0 === r && (r = 2), this.algorithms.ChordsDetection(o, t, i, r)
		}, t.prototype.ChordsDetectionBeats = function (o, t, i, r, e) {
			return void 0 === i && (i = "interbeat_median"), void 0 === r && (r = 2048), void 0 === e && (e = 44100), this.algorithms.ChordsDetectionBeats(o, t, i, r, e)
		}, t.prototype.ChromaCrossSimilarity = function (o, t, i, r, e, n, d, v, s) {
			return void 0 === i && (i = .095), void 0 === r && (r = 9), void 0 === e && (e = 1), void 0 === n && (n = 12), void 0 === d && (d = !0), void 0 === v && (v = !1), void 0 === s && (s = !1), this.algorithms.ChromaCrossSimilarity(o, t, i, r, e, n, d, v, s)
		}, t.prototype.Chromagram = function (o, t, i, r, e, n, d, v, s, a, u) {
			return void 0 === t && (t = 12), void 0 === i && (i = 32.7), void 0 === r && (r = 4), void 0 === e && (e = "unit_max"), void 0 === n && (n = 84), void 0 === d && (d = 44100), void 0 === v && (v = 1), void 0 === s && (s = .01), void 0 === a && (a = "hann"), void 0 === u && (u = !0), this.algorithms.Chromagram(o, t, i, r, e, n, d, v, s, a, u)
		}, t.prototype.Chromaprinter = function (o, t, i) {
			return void 0 === t && (t = 0), void 0 === i && (i = 44100), this.algorithms.Chromaprinter(o, t, i)
		}, t.prototype.ClickDetector = function (o, t, i, r, e, n, d, v) {
			return void 0 === t && (t = 30), void 0 === i && (i = 512), void 0 === r && (r = 256), void 0 === e && (e = 12), void 0 === n && (n = 10), void 0 === d && (d = 44100), void 0 === v && (v = -50), this.algorithms.ClickDetector(o, t, i, r, e, n, d, v)
		}, t.prototype.Clipper = function (o, t, i) {
			return void 0 === t && (t = 1), void 0 === i && (i = -1), this.algorithms.Clipper(o, t, i)
		}, t.prototype.CoverSongSimilarity = function (o, t, i, r, e) {
			return void 0 === t && (t = "serra09"), void 0 === i && (i = .5), void 0 === r && (r = .5), void 0 === e && (e = "asymmetric"), this.algorithms.CoverSongSimilarity(o, t, i, r, e)
		}, t.prototype.Crest = function (o) {
			return this.algorithms.Crest(o)
		}, t.prototype.CrossCorrelation = function (o, t, i, r) {
			return void 0 === i && (i = 1), void 0 === r && (r = 0), this.algorithms.CrossCorrelation(o, t, i, r)
		}, t.prototype.CrossSimilarityMatrix = function (o, t, i, r, e, n) {
			return void 0 === i && (i = !1), void 0 === r && (r = .095), void 0 === e && (e = 1), void 0 === n && (n = 1), this.algorithms.CrossSimilarityMatrix(o, t, i, r, e, n)
		}, t.prototype.CubicSpline = function (o, t, i, r, e, n, d) {
			void 0 === t && (t = 0), void 0 === i && (i = 0), void 0 === r && (r = 0), void 0 === e && (e = 0), void 0 === n && (n = [0, 1]), void 0 === d && (d = [0, 1]);
			for (var v = new this.module.VectorFloat, s = 0; s < v.size(); s++) v.push_back(n[s]);
			var a = new this.module.VectorFloat;
			for (s = 0; s < a.size(); s++) a.push_back(d[s]);
			return this.algorithms.CubicSpline(o, t, i, r, e, v, a)
		}, t.prototype.DCRemoval = function (o, t, i) {
			return void 0 === t && (t = 40), void 0 === i && (i = 44100), this.algorithms.DCRemoval(o, t, i)
		}, t.prototype.DCT = function (o, t, i, r, e) {
			return void 0 === t && (t = 2), void 0 === i && (i = 10), void 0 === r && (r = 0), void 0 === e && (e = 10), this.algorithms.DCT(o, t, i, r, e)
		}, t.prototype.Danceability = function (o, t, i, r, e) {
			return void 0 === t && (t = 8800), void 0 === i && (i = 310), void 0 === r && (r = 44100), void 0 === e && (e = 1.1), this.algorithms.Danceability(o, t, i, r, e)
		}, t.prototype.Decrease = function (o, t) {
			return void 0 === t && (t = 1), this.algorithms.Decrease(o, t)
		}, t.prototype.Derivative = function (o) {
			return this.algorithms.Derivative(o)
		}, t.prototype.DerivativeSFX = function (o) {
			return this.algorithms.DerivativeSFX(o)
		}, t.prototype.DiscontinuityDetector = function (o, t, i, r, e, n, d, v, s) {
			return void 0 === t && (t = 8), void 0 === i && (i = -60), void 0 === r && (r = 512), void 0 === e && (e = 256), void 0 === n && (n = 7), void 0 === d && (d = 3), void 0 === v && (v = -50), void 0 === s && (s = 32), this.algorithms.DiscontinuityDetector(o, t, i, r, e, n, d, v, s)
		}, t.prototype.Dissonance = function (o, t) {
			return this.algorithms.Dissonance(o, t)
		}, t.prototype.DistributionShape = function (o) {
			return this.algorithms.DistributionShape(o)
		}, t.prototype.Duration = function (o, t) {
			return void 0 === t && (t = 44100), this.algorithms.Duration(o, t)
		}, t.prototype.DynamicComplexity = function (o, t, i) {
			return void 0 === t && (t = .2), void 0 === i && (i = 44100), this.algorithms.DynamicComplexity(o, t, i)
		}, t.prototype.ERBBands = function (o, t, i, r, e, n, d, v) {
			return void 0 === t && (t = 22050), void 0 === i && (i = 1025), void 0 === r && (r = 50), void 0 === e && (e = 40), void 0 === n && (n = 44100), void 0 === d && (d = "power"), void 0 === v && (v = 1), this.algorithms.ERBBands(o, t, i, r, e, n, d, v)
		}, t.prototype.EffectiveDuration = function (o, t, i) {
			return void 0 === t && (t = 44100), void 0 === i && (i = .4), this.algorithms.EffectiveDuration(o, t, i)
		}, t.prototype.Energy = function (o) {
			return this.algorithms.Energy(o)
		}, t.prototype.EnergyBand = function (o, t, i, r) {
			return void 0 === t && (t = 44100), void 0 === i && (i = 0), void 0 === r && (r = 100), this.algorithms.EnergyBand(o, t, i, r)
		}, t.prototype.EnergyBandRatio = function (o, t, i, r) {
			return void 0 === t && (t = 44100), void 0 === i && (i = 0), void 0 === r && (r = 100), this.algorithms.EnergyBandRatio(o, t, i, r)
		}, t.prototype.Entropy = function (o) {
			return this.algorithms.Entropy(o)
		}, t.prototype.Envelope = function (o, t, i, r, e) {
			return void 0 === t && (t = !0), void 0 === i && (i = 10), void 0 === r && (r = 1500), void 0 === e && (e = 44100), this.algorithms.Envelope(o, t, i, r, e)
		}, t.prototype.EqualLoudness = function (o, t) {
			return void 0 === t && (t = 44100), this.algorithms.EqualLoudness(o, t)
		}, t.prototype.Flatness = function (o) {
			return this.algorithms.Flatness(o)
		}, t.prototype.FlatnessDB = function (o) {
			return this.algorithms.FlatnessDB(o)
		}, t.prototype.FlatnessSFX = function (o) {
			return this.algorithms.FlatnessSFX(o)
		}, t.prototype.Flux = function (o, t, i) {
			return void 0 === t && (t = !1), void 0 === i && (i = "L2"), this.algorithms.Flux(o, t, i)
		}, t.prototype.FrameCutter = function (o, t, i, r, e, n) {
			return void 0 === t && (t = 1024), void 0 === i && (i = 512), void 0 === r && (r = !1), void 0 === e && (e = !1), void 0 === n && (n = 0), this.algorithms.FrameCutter(o, t, i, r, e, n)
		}, t.prototype.FrameToReal = function (o, t, i) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 128), this.algorithms.FrameToReal(o, t, i)
		}, t.prototype.FrequencyBands = function (o, t, i) {
			void 0 === t && (t = [0, 50, 100, 150, 200, 300, 400, 510, 630, 770, 920, 1080, 1270, 1480, 1720, 2e3, 2320, 2700, 3150, 3700, 4400, 5300, 6400, 7700, 9500, 12e3, 15500, 20500, 27e3]), void 0 === i && (i = 44100);
			for (var r = new this.module.VectorFloat, e = 0; e < r.size(); e++) r.push_back(t[e]);
			return this.algorithms.FrequencyBands(o, r, i)
		}, t.prototype.GFCC = function (o, t, i, r, e, n, d, v, s, a, u) {
			return void 0 === t && (t = 2), void 0 === i && (i = 22050), void 0 === r && (r = 1025), void 0 === e && (e = "dbamp"), void 0 === n && (n = 40), void 0 === d && (d = 40), void 0 === v && (v = 13), void 0 === s && (s = 44100), void 0 === a && (a = 1e-10), void 0 === u && (u = "power"), this.algorithms.GFCC(o, t, i, r, e, n, d, v, s, a, u)
		}, t.prototype.GapsDetector = function (o, t, i, r, e, n, d, v, s, a, u, p, h) {
			return void 0 === t && (t = .05), void 0 === i && (i = 2048), void 0 === r && (r = 1024), void 0 === e && (e = 11), void 0 === n && (n = 3500), void 0 === d && (d = 10), void 0 === v && (v = 40), void 0 === s && (s = -30), void 0 === a && (a = 40), void 0 === u && (u = .05), void 0 === p && (p = 44100), void 0 === h && (h = -50), this.algorithms.GapsDetector(o, t, i, r, e, n, d, v, s, a, u, p, h)
		}, t.prototype.GeometricMean = function (o) {
			return this.algorithms.GeometricMean(o)
		}, t.prototype.HFC = function (o, t, i) {
			return void 0 === t && (t = 44100), void 0 === i && (i = "Masri"), this.algorithms.HFC(o, t, i)
		}, t.prototype.HPCP = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l, c) {
			return void 0 === i && (i = !0), void 0 === r && (r = 500), void 0 === e && (e = 0), void 0 === n && (n = 5e3), void 0 === d && (d = !1), void 0 === v && (v = 40), void 0 === s && (s = !1), void 0 === a && (a = "unitMax"), void 0 === u && (u = 440), void 0 === p && (p = 44100), void 0 === h && (h = 12), void 0 === l && (l = "squaredCosine"), void 0 === c && (c = 1), this.algorithms.HPCP(o, t, i, r, e, n, d, v, s, a, u, p, h, l, c)
		}, t.prototype.HarmonicBpm = function (o, t, i, r) {
			return void 0 === t && (t = 60), void 0 === i && (i = 20), void 0 === r && (r = 5), this.algorithms.HarmonicBpm(o, t, i, r)
		}, t.prototype.HarmonicPeaks = function (o, t, i, r, e) {
			return void 0 === r && (r = 20), void 0 === e && (e = .2), this.algorithms.HarmonicPeaks(o, t, i, r, e)
		}, t.prototype.HighPass = function (o, t, i) {
			return void 0 === t && (t = 1500), void 0 === i && (i = 44100), this.algorithms.HighPass(o, t, i)
		}, t.prototype.HighResolutionFeatures = function (o, t) {
			return void 0 === t && (t = 24), this.algorithms.HighResolutionFeatures(o, t)
		}, t.prototype.Histogram = function (o, t, i, r, e) {
			return void 0 === t && (t = 1), void 0 === i && (i = 0), void 0 === r && (r = "none"), void 0 === e && (e = 10), this.algorithms.Histogram(o, t, i, r, e)
		}, t.prototype.HprModelAnal = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m) {
			return void 0 === i && (i = 2048), void 0 === r && (r = 20), void 0 === e && (e = .01), void 0 === n && (n = .01), void 0 === d && (d = 512), void 0 === v && (v = 0), void 0 === s && (s = 5e3), void 0 === a && (a = 100), void 0 === u && (u = 100), void 0 === p && (p = 20), void 0 === h && (h = 100), void 0 === l && (l = "frequency"), void 0 === c && (c = 44100), void 0 === m && (m = .2), this.algorithms.HprModelAnal(o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m)
		}, t.prototype.HpsModelAnal = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m) {
			return void 0 === i && (i = 2048), void 0 === r && (r = 20), void 0 === e && (e = .01), void 0 === n && (n = .01), void 0 === d && (d = 512), void 0 === v && (v = 0), void 0 === s && (s = 5e3), void 0 === a && (a = 100), void 0 === u && (u = 100), void 0 === p && (p = 20), void 0 === h && (h = 100), void 0 === l && (l = "frequency"), void 0 === c && (c = 44100), void 0 === m && (m = .2), this.algorithms.HpsModelAnal(o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m)
		}, t.prototype.IDCT = function (o, t, i, r, e) {
			return void 0 === t && (t = 2), void 0 === i && (i = 10), void 0 === r && (r = 0), void 0 === e && (e = 10), this.algorithms.IDCT(o, t, i, r, e)
		}, t.prototype.IIR = function (o, t, i) {
			void 0 === t && (t = [1]), void 0 === i && (i = [1]);
			for (var r = new this.module.VectorFloat, e = 0; e < r.size(); e++) r.push_back(t[e]);
			var n = new this.module.VectorFloat;
			for (e = 0; e < n.size(); e++) n.push_back(i[e]);
			return this.algorithms.IIR(o, r, n)
		}, t.prototype.Inharmonicity = function (o, t) {
			return this.algorithms.Inharmonicity(o, t)
		}, t.prototype.InstantPower = function (o) {
			return this.algorithms.InstantPower(o)
		}, t.prototype.Intensity = function (o, t) {
			return void 0 === t && (t = 44100), this.algorithms.Intensity(o, t)
		}, t.prototype.Key = function (o, t, i, r, e, n, d, v) {
			return void 0 === t && (t = 4), void 0 === i && (i = 36), void 0 === r && (r = "bgate"), void 0 === e && (e = .6), void 0 === n && (n = !1), void 0 === d && (d = !0), void 0 === v && (v = !0), this.algorithms.Key(o, t, i, r, e, n, d, v)
		}, t.prototype.KeyExtractor = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l, c) {
			return void 0 === t && (t = !0), void 0 === i && (i = 4096), void 0 === r && (r = 4096), void 0 === e && (e = 12), void 0 === n && (n = 3500), void 0 === d && (d = 60), void 0 === v && (v = 25), void 0 === s && (s = .2), void 0 === a && (a = "bgate"), void 0 === u && (u = 44100), void 0 === p && (p = 1e-4), void 0 === h && (h = 440), void 0 === l && (l = "cosine"), void 0 === c && (c = "hann"), this.algorithms.KeyExtractor(o, t, i, r, e, n, d, v, s, a, u, p, h, l, c)
		}, t.prototype.LPC = function (o, t, i, r) {
			return void 0 === t && (t = 10), void 0 === i && (i = 44100), void 0 === r && (r = "regular"), this.algorithms.LPC(o, t, i, r)
		}, t.prototype.Larm = function (o, t, i, r, e) {
			return void 0 === t && (t = 10), void 0 === i && (i = 1.5), void 0 === r && (r = 1500), void 0 === e && (e = 44100), this.algorithms.Larm(o, t, i, r, e)
		}, t.prototype.Leq = function (o) {
			return this.algorithms.Leq(o)
		}, t.prototype.LevelExtractor = function (o, t, i) {
			return void 0 === t && (t = 88200), void 0 === i && (i = 44100), this.algorithms.LevelExtractor(o, t, i)
		}, t.prototype.LogAttackTime = function (o, t, i, r) {
			return void 0 === t && (t = 44100), void 0 === i && (i = .2), void 0 === r && (r = .9), this.algorithms.LogAttackTime(o, t, i, r)
		}, t.prototype.LogSpectrum = function (o, t, i, r, e) {
			return void 0 === t && (t = 3), void 0 === i && (i = 1025), void 0 === r && (r = 0), void 0 === e && (e = 44100), this.algorithms.LogSpectrum(o, t, i, r, e)
		}, t.prototype.LoopBpmConfidence = function (o, t, i) {
			return void 0 === i && (i = 44100), this.algorithms.LoopBpmConfidence(o, t, i)
		}, t.prototype.LoopBpmEstimator = function (o, t) {
			return void 0 === t && (t = .95), this.algorithms.LoopBpmEstimator(o, t)
		}, t.prototype.Loudness = function (o) {
			return this.algorithms.Loudness(o)
		}, t.prototype.LoudnessVickers = function (o, t) {
			return void 0 === t && (t = 44100), this.algorithms.LoudnessVickers(o, t)
		}, t.prototype.LowLevelSpectralEqloudExtractor = function (o, t, i, r) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 1024), void 0 === r && (r = 44100), this.algorithms.LowLevelSpectralEqloudExtractor(o, t, i, r)
		}, t.prototype.LowLevelSpectralExtractor = function (o, t, i, r) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 1024), void 0 === r && (r = 44100), this.algorithms.LowLevelSpectralExtractor(o, t, i, r)
		}, t.prototype.LowPass = function (o, t, i) {
			return void 0 === t && (t = 1500), void 0 === i && (i = 44100), this.algorithms.LowPass(o, t, i)
		}, t.prototype.MFCC = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l, c) {
			return void 0 === t && (t = 2), void 0 === i && (i = 11e3), void 0 === r && (r = 1025), void 0 === e && (e = 0), void 0 === n && (n = "dbamp"), void 0 === d && (d = 0), void 0 === v && (v = "unit_sum"), void 0 === s && (s = 40), void 0 === a && (a = 13), void 0 === u && (u = 44100), void 0 === p && (p = 1e-10), void 0 === h && (h = "power"), void 0 === l && (l = "htkMel"), void 0 === c && (c = "warping"), this.algorithms.MFCC(o, t, i, r, e, n, d, v, s, a, u, p, h, l, c)
		}, t.prototype.MaxFilter = function (o, t, i) {
			return void 0 === t && (t = !0), void 0 === i && (i = 3), this.algorithms.MaxFilter(o, t, i)
		}, t.prototype.MaxMagFreq = function (o, t) {
			return void 0 === t && (t = 44100), this.algorithms.MaxMagFreq(o, t)
		}, t.prototype.MaxToTotal = function (o) {
			return this.algorithms.MaxToTotal(o)
		}, t.prototype.Mean = function (o) {
			return this.algorithms.Mean(o)
		}, t.prototype.Median = function (o) {
			return this.algorithms.Median(o)
		}, t.prototype.MedianFilter = function (o, t) {
			return void 0 === t && (t = 11), this.algorithms.MedianFilter(o, t)
		}, t.prototype.MelBands = function (o, t, i, r, e, n, d, v, s, a, u) {
			return void 0 === t && (t = 22050), void 0 === i && (i = 1025), void 0 === r && (r = !1), void 0 === e && (e = 0), void 0 === n && (n = "unit_sum"), void 0 === d && (d = 24), void 0 === v && (v = 44100), void 0 === s && (s = "power"), void 0 === a && (a = "htkMel"), void 0 === u && (u = "warping"), this.algorithms.MelBands(o, t, i, r, e, n, d, v, s, a, u)
		}, t.prototype.Meter = function (o) {
			return this.algorithms.Meter(o)
		}, t.prototype.MinMax = function (o, t) {
			return void 0 === t && (t = "min"), this.algorithms.MinMax(o, t)
		}, t.prototype.MinToTotal = function (o) {
			return this.algorithms.MinToTotal(o)
		}, t.prototype.MovingAverage = function (o, t) {
			return void 0 === t && (t = 6), this.algorithms.MovingAverage(o, t)
		}, t.prototype.MultiPitchKlapuri = function (o, t, i, r, e, n, d, v, s, a, u, p) {
			return void 0 === t && (t = 10), void 0 === i && (i = 2048), void 0 === r && (r = .8), void 0 === e && (e = 128), void 0 === n && (n = 1), void 0 === d && (d = 40), void 0 === v && (v = 1760), void 0 === s && (s = 80), void 0 === a && (a = 10), void 0 === u && (u = 55), void 0 === p && (p = 44100), this.algorithms.MultiPitchKlapuri(o, t, i, r, e, n, d, v, s, a, u, p)
		}, t.prototype.MultiPitchMelodia = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m, y, g, f) {
			return void 0 === t && (t = 10), void 0 === i && (i = 3), void 0 === r && (r = 2048), void 0 === e && (e = !1), void 0 === n && (n = .8), void 0 === d && (d = 128), void 0 === v && (v = 1), void 0 === s && (s = 40), void 0 === a && (a = 2e4), void 0 === u && (u = 100), void 0 === p && (p = 40), void 0 === h && (h = 20), void 0 === l && (l = .9), void 0 === c && (c = .9), void 0 === m && (m = 27.5625), void 0 === y && (y = 55), void 0 === g && (g = 44100), void 0 === f && (f = 100), this.algorithms.MultiPitchMelodia(o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m, y, g, f)
		}, t.prototype.Multiplexer = function (o, t) {
			return void 0 === o && (o = 0), void 0 === t && (t = 0), this.algorithms.Multiplexer(o, t)
		}, t.prototype.NNLSChroma = function (o, t, i, r, e, n, d, v, s, a) {
			return void 0 === r && (r = "none"), void 0 === e && (e = 1025), void 0 === n && (n = 44100), void 0 === d && (d = .7), void 0 === v && (v = 1), void 0 === s && (s = "global"), void 0 === a && (a = !0), this.algorithms.NNLSChroma(o, t, i, r, e, n, d, v, s, a)
		}, t.prototype.NoiseAdder = function (o, t, i) {
			return void 0 === t && (t = !1), void 0 === i && (i = -100), this.algorithms.NoiseAdder(o, t, i)
		}, t.prototype.NoiseBurstDetector = function (o, t, i, r) {
			return void 0 === t && (t = .9), void 0 === i && (i = -50), void 0 === r && (r = 8), this.algorithms.NoiseBurstDetector(o, t, i, r)
		}, t.prototype.NoveltyCurve = function (o, t, i, r, e) {
			void 0 === t && (t = 344.531), void 0 === i && (i = !1), void 0 === r && (r = []), void 0 === e && (e = "hybrid");
			for (var n = new this.module.VectorFloat, d = 0; d < n.size(); d++) n.push_back(r[d]);
			return this.algorithms.NoveltyCurve(o, t, i, n, e)
		}, t.prototype.NoveltyCurveFixedBpmEstimator = function (o, t, i, r, e, n) {
			return void 0 === t && (t = 512), void 0 === i && (i = 560), void 0 === r && (r = 30), void 0 === e && (e = 44100), void 0 === n && (n = 3), this.algorithms.NoveltyCurveFixedBpmEstimator(o, t, i, r, e, n)
		}, t.prototype.OddToEvenHarmonicEnergyRatio = function (o, t) {
			return this.algorithms.OddToEvenHarmonicEnergyRatio(o, t)
		}, t.prototype.OnsetDetection = function (o, t, i, r) {
			return void 0 === i && (i = "hfc"), void 0 === r && (r = 44100), this.algorithms.OnsetDetection(o, t, i, r)
		}, t.prototype.OnsetDetectionGlobal = function (o, t, i, r, e) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 512), void 0 === r && (r = "infogain"), void 0 === e && (e = 44100), this.algorithms.OnsetDetectionGlobal(o, t, i, r, e)
		}, t.prototype.OnsetRate = function (o) {
			return this.algorithms.OnsetRate(o)
		}, t.prototype.OverlapAdd = function (o, t, i, r) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 1), void 0 === r && (r = 128), this.algorithms.OverlapAdd(o, t, i, r)
		}, t.prototype.PeakDetection = function (o, t, i, r, e, n, d, v, s) {
			return void 0 === t && (t = !0), void 0 === i && (i = 100), void 0 === r && (r = 1), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === d && (d = "position"), void 0 === v && (v = 1), void 0 === s && (s = -1e6), this.algorithms.PeakDetection(o, t, i, r, e, n, d, v, s)
		}, t.prototype.PercivalBpmEstimator = function (o, t, i, r, e, n, d, v) {
			return void 0 === t && (t = 1024), void 0 === i && (i = 2048), void 0 === r && (r = 128), void 0 === e && (e = 128), void 0 === n && (n = 210), void 0 === d && (d = 50), void 0 === v && (v = 44100), this.algorithms.PercivalBpmEstimator(o, t, i, r, e, n, d, v)
		}, t.prototype.PercivalEnhanceHarmonics = function (o) {
			return this.algorithms.PercivalEnhanceHarmonics(o)
		}, t.prototype.PercivalEvaluatePulseTrains = function (o, t) {
			return this.algorithms.PercivalEvaluatePulseTrains(o, t)
		}, t.prototype.PitchContourSegmentation = function (o, t, i, r, e, n, d, v) {
			return void 0 === i && (i = 128), void 0 === r && (r = .1), void 0 === e && (e = 60), void 0 === n && (n = -2), void 0 === d && (d = 44100), void 0 === v && (v = 440), this.algorithms.PitchContourSegmentation(o, t, i, r, e, n, d, v)
		}, t.prototype.PitchContours = function (o, t, i, r, e, n, d, v, s, a) {
			return void 0 === i && (i = 10), void 0 === r && (r = 128), void 0 === e && (e = 100), void 0 === n && (n = .9), void 0 === d && (d = .9), void 0 === v && (v = 27.5625), void 0 === s && (s = 44100), void 0 === a && (a = 100), this.algorithms.PitchContours(o, t, i, r, e, n, d, v, s, a)
		}, t.prototype.PitchContoursMelody = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l) {
			return void 0 === e && (e = 10), void 0 === n && (n = 3), void 0 === d && (d = !1), void 0 === v && (v = 128), void 0 === s && (s = 2e4), void 0 === a && (a = 80), void 0 === u && (u = 55), void 0 === p && (p = 44100), void 0 === h && (h = !1), void 0 === l && (l = .2), this.algorithms.PitchContoursMelody(o, t, i, r, e, n, d, v, s, a, u, p, h, l)
		}, t.prototype.PitchContoursMonoMelody = function (o, t, i, r, e, n, d, v, s, a, u, p) {
			return void 0 === e && (e = 10), void 0 === n && (n = 3), void 0 === d && (d = !1), void 0 === v && (v = 128), void 0 === s && (s = 2e4), void 0 === a && (a = 80), void 0 === u && (u = 55), void 0 === p && (p = 44100), this.algorithms.PitchContoursMonoMelody(o, t, i, r, e, n, d, v, s, a, u, p)
		}, t.prototype.PitchContoursMultiMelody = function (o, t, i, r, e, n, d, v, s, a, u, p) {
			return void 0 === e && (e = 10), void 0 === n && (n = 3), void 0 === d && (d = !1), void 0 === v && (v = 128), void 0 === s && (s = 2e4), void 0 === a && (a = 80), void 0 === u && (u = 55), void 0 === p && (p = 44100), this.algorithms.PitchContoursMultiMelody(o, t, i, r, e, n, d, v, s, a, u, p)
		}, t.prototype.PitchFilter = function (o, t, i, r, e) {
			return void 0 === i && (i = 36), void 0 === r && (r = 30), void 0 === e && (e = !1), this.algorithms.PitchFilter(o, t, i, r, e)
		}, t.prototype.PitchMelodia = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m, y, g, f) {
			return void 0 === t && (t = 10), void 0 === i && (i = 3), void 0 === r && (r = 2048), void 0 === e && (e = !1), void 0 === n && (n = .8), void 0 === d && (d = 128), void 0 === v && (v = 1), void 0 === s && (s = 40), void 0 === a && (a = 2e4), void 0 === u && (u = 100), void 0 === p && (p = 40), void 0 === h && (h = 20), void 0 === l && (l = .9), void 0 === c && (c = .9), void 0 === m && (m = 27.5625), void 0 === y && (y = 55), void 0 === g && (g = 44100), void 0 === f && (f = 100), this.algorithms.PitchMelodia(o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m, y, g, f)
		}, t.prototype.PitchSalience = function (o, t, i, r) {
			return void 0 === t && (t = 5e3), void 0 === i && (i = 100), void 0 === r && (r = 44100), this.algorithms.PitchSalience(o, t, i, r)
		}, t.prototype.PitchSalienceFunction = function (o, t, i, r, e, n, d, v) {
			return void 0 === i && (i = 10), void 0 === r && (r = .8), void 0 === e && (e = 1), void 0 === n && (n = 40), void 0 === d && (d = 20), void 0 === v && (v = 55), this.algorithms.PitchSalienceFunction(o, t, i, r, e, n, d, v)
		}, t.prototype.PitchSalienceFunctionPeaks = function (o, t, i, r, e) {
			return void 0 === t && (t = 10), void 0 === i && (i = 1760), void 0 === r && (r = 55), void 0 === e && (e = 55), this.algorithms.PitchSalienceFunctionPeaks(o, t, i, r, e)
		}, t.prototype.PitchYin = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = 2048), void 0 === i && (i = !0), void 0 === r && (r = 22050), void 0 === e && (e = 20), void 0 === n && (n = 44100), void 0 === d && (d = .15), this.algorithms.PitchYin(o, t, i, r, e, n, d)
		}, t.prototype.PitchYinFFT = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = 2048), void 0 === i && (i = !0), void 0 === r && (r = 22050), void 0 === e && (e = 20), void 0 === n && (n = 44100), void 0 === d && (d = 1), this.algorithms.PitchYinFFT(o, t, i, r, e, n, d)
		}, t.prototype.PitchYinProbabilistic = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 256), void 0 === r && (r = .1), void 0 === e && (e = "negative"), void 0 === n && (n = !1), void 0 === d && (d = 44100), this.algorithms.PitchYinProbabilistic(o, t, i, r, e, n, d)
		}, t.prototype.PitchYinProbabilities = function (o, t, i, r, e) {
			return void 0 === t && (t = 2048), void 0 === i && (i = .1), void 0 === r && (r = !1), void 0 === e && (e = 44100), this.algorithms.PitchYinProbabilities(o, t, i, r, e)
		}, t.prototype.PitchYinProbabilitiesHMM = function (o, t, i, r, e, n) {
			return void 0 === i && (i = 61.735), void 0 === r && (r = 5), void 0 === e && (e = .99), void 0 === n && (n = .5), this.algorithms.PitchYinProbabilitiesHMM(o, t, i, r, e, n)
		}, t.prototype.PowerMean = function (o, t) {
			return void 0 === t && (t = 1), this.algorithms.PowerMean(o, t)
		}, t.prototype.PowerSpectrum = function (o, t) {
			return void 0 === t && (t = 2048), this.algorithms.PowerSpectrum(o, t)
		}, t.prototype.PredominantPitchMelodia = function (o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m, y, g, f, S, C) {
			return void 0 === t && (t = 10), void 0 === i && (i = 3), void 0 === r && (r = 2048), void 0 === e && (e = !1), void 0 === n && (n = .8), void 0 === d && (d = 128), void 0 === v && (v = 1), void 0 === s && (s = 40), void 0 === a && (a = 2e4), void 0 === u && (u = 100), void 0 === p && (p = 80), void 0 === h && (h = 20), void 0 === l && (l = .9), void 0 === c && (c = .9), void 0 === m && (m = 27.5625), void 0 === y && (y = 55), void 0 === g && (g = 44100), void 0 === f && (f = 100), void 0 === S && (S = !1), void 0 === C && (C = .2), this.algorithms.PredominantPitchMelodia(o, t, i, r, e, n, d, v, s, a, u, p, h, l, c, m, y, g, f, S, C)
		}, t.prototype.RMS = function (o) {
			return this.algorithms.RMS(o)
		}, t.prototype.RawMoments = function (o, t) {
			return void 0 === t && (t = 22050), this.algorithms.RawMoments(o, t)
		}, t.prototype.ReplayGain = function (o, t) {
			return void 0 === t && (t = 44100), this.algorithms.ReplayGain(o, t)
		}, t.prototype.Resample = function (o, t, i, r) {
			return void 0 === t && (t = 44100), void 0 === i && (i = 44100), void 0 === r && (r = 1), this.algorithms.Resample(o, t, i, r)
		}, t.prototype.ResampleFFT = function (o, t, i) {
			return void 0 === t && (t = 128), void 0 === i && (i = 128), this.algorithms.ResampleFFT(o, t, i)
		}, t.prototype.RhythmDescriptors = function (o) {
			return this.algorithms.RhythmDescriptors(o)
		}, t.prototype.RhythmExtractor = function (o, t, i, r, e, n, d, v, s, a, u, p, h) {
			void 0 === t && (t = 1024), void 0 === i && (i = 1024), void 0 === r && (r = 256), void 0 === e && (e = .1), void 0 === n && (n = 208), void 0 === d && (d = 40), void 0 === v && (v = 1024), void 0 === s && (s = 44100), void 0 === a && (a = []), void 0 === u && (u = .24), void 0 === p && (p = !0), void 0 === h && (h = !0);
			for (var l = new this.module.VectorFloat, c = 0; c < l.size(); c++) l.push_back(a[c]);
			return this.algorithms.RhythmExtractor(o, t, i, r, e, n, d, v, s, l, u, p, h)
		}, t.prototype.RhythmExtractor2013 = function (o, t, i, r) {
			return void 0 === t && (t = 208), void 0 === i && (i = "multifeature"), void 0 === r && (r = 40), this.algorithms.RhythmExtractor2013(o, t, i, r)
		}, t.prototype.RhythmTransform = function (o, t, i) {
			return void 0 === t && (t = 256), void 0 === i && (i = 32), this.algorithms.RhythmTransform(o, t, i)
		}, t.prototype.RollOff = function (o, t, i) {
			return void 0 === t && (t = .85), void 0 === i && (i = 44100), this.algorithms.RollOff(o, t, i)
		}, t.prototype.SNR = function (o, t, i, r, e, n, d, v) {
			return void 0 === t && (t = .95), void 0 === i && (i = .98), void 0 === r && (r = .9), void 0 === e && (e = 512), void 0 === n && (n = -40), void 0 === d && (d = 44100), void 0 === v && (v = !0), this.algorithms.SNR(o, t, i, r, e, n, d, v)
		}, t.prototype.SaturationDetector = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = .001), void 0 === i && (i = -1), void 0 === r && (r = 512), void 0 === e && (e = 256), void 0 === n && (n = .005), void 0 === d && (d = 44100), this.algorithms.SaturationDetector(o, t, i, r, e, n, d)
		}, t.prototype.Scale = function (o, t, i, r) {
			return void 0 === t && (t = !0), void 0 === i && (i = 10), void 0 === r && (r = 1), this.algorithms.Scale(o, t, i, r)
		}, t.prototype.SineSubtraction = function (o, t, i, r, e, n, d) {
			return void 0 === e && (e = 512), void 0 === n && (n = 128), void 0 === d && (d = 44100), this.algorithms.SineSubtraction(o, t, i, r, e, n, d)
		}, t.prototype.SingleBeatLoudness = function (o, t, i, r, e, n) {
			void 0 === t && (t = .05), void 0 === i && (i = .1), void 0 === r && (r = [0, 200, 400, 800, 1600, 3200, 22e3]), void 0 === e && (e = "sumEnergy"), void 0 === n && (n = 44100);
			for (var d = new this.module.VectorFloat, v = 0; v < d.size(); v++) d.push_back(r[v]);
			return this.algorithms.SingleBeatLoudness(o, t, i, d, e, n)
		}, t.prototype.Slicer = function (o, t, i, r, e) {
			void 0 === t && (t = []), void 0 === i && (i = 44100), void 0 === r && (r = []), void 0 === e && (e = "seconds");
			for (var n = new this.module.VectorFloat, d = 0; d < n.size(); d++) n.push_back(t[d]);
			var v = new this.module.VectorFloat;
			for (d = 0; d < v.size(); d++) v.push_back(r[d]);
			return this.algorithms.Slicer(o, n, i, v, e)
		}, t.prototype.SpectralCentroidTime = function (o, t) {
			return void 0 === t && (t = 44100), this.algorithms.SpectralCentroidTime(o, t)
		}, t.prototype.SpectralComplexity = function (o, t, i) {
			return void 0 === t && (t = .005), void 0 === i && (i = 44100), this.algorithms.SpectralComplexity(o, t, i)
		}, t.prototype.SpectralContrast = function (o, t, i, r, e, n, d, v) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 11e3), void 0 === r && (r = 20), void 0 === e && (e = .4), void 0 === n && (n = 6), void 0 === d && (d = 22050), void 0 === v && (v = .15), this.algorithms.SpectralContrast(o, t, i, r, e, n, d, v)
		}, t.prototype.SpectralPeaks = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = 0), void 0 === i && (i = 5e3), void 0 === r && (r = 100), void 0 === e && (e = 0), void 0 === n && (n = "frequency"), void 0 === d && (d = 44100), this.algorithms.SpectralPeaks(o, t, i, r, e, n, d)
		}, t.prototype.SpectralWhitening = function (o, t, i, r, e) {
			return void 0 === r && (r = 5e3), void 0 === e && (e = 44100), this.algorithms.SpectralWhitening(o, t, i, r, e)
		}, t.prototype.Spectrum = function (o, t) {
			return void 0 === t && (t = 2048), this.algorithms.Spectrum(o, t)
		}, t.prototype.SpectrumCQ = function (o, t, i, r, e, n, d, v, s, a) {
			return void 0 === t && (t = 12), void 0 === i && (i = 32.7), void 0 === r && (r = 4), void 0 === e && (e = 84), void 0 === n && (n = 44100), void 0 === d && (d = 1), void 0 === v && (v = .01), void 0 === s && (s = "hann"), void 0 === a && (a = !0), this.algorithms.SpectrumCQ(o, t, i, r, e, n, d, v, s, a)
		}, t.prototype.SpectrumToCent = function (o, t, i, r, e, n, d, v, s) {
			return void 0 === t && (t = 720), void 0 === i && (i = 10), void 0 === r && (r = 32768), void 0 === e && (e = !0), void 0 === n && (n = 164), void 0 === d && (d = "unit_sum"), void 0 === v && (v = 44100), void 0 === s && (s = "power"), this.algorithms.SpectrumToCent(o, t, i, r, e, n, d, v, s)
		}, t.prototype.Spline = function (o, t, i, r, e, n) {
			void 0 === t && (t = 1), void 0 === i && (i = 0), void 0 === r && (r = "b"), void 0 === e && (e = [0, 1]), void 0 === n && (n = [0, 1]);
			for (var d = new this.module.VectorFloat, v = 0; v < d.size(); v++) d.push_back(e[v]);
			var s = new this.module.VectorFloat;
			for (v = 0; v < s.size(); v++) s.push_back(n[v]);
			return this.algorithms.Spline(o, t, i, r, d, s)
		}, t.prototype.SprModelAnal = function (o, t, i, r, e, n, d, v, s, a, u, p) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 20), void 0 === r && (r = .01), void 0 === e && (e = 512), void 0 === n && (n = 0), void 0 === d && (d = 5e3), void 0 === v && (v = 100), void 0 === s && (s = 100), void 0 === a && (a = 0), void 0 === u && (u = "frequency"), void 0 === p && (p = 44100), this.algorithms.SprModelAnal(o, t, i, r, e, n, d, v, s, a, u, p)
		}, t.prototype.SprModelSynth = function (o, t, i, r, e, n, d) {
			return void 0 === e && (e = 2048), void 0 === n && (n = 512), void 0 === d && (d = 44100), this.algorithms.SprModelSynth(o, t, i, r, e, n, d)
		}, t.prototype.SpsModelAnal = function (o, t, i, r, e, n, d, v, s, a, u, p, h) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 20), void 0 === r && (r = .01), void 0 === e && (e = 512), void 0 === n && (n = 0), void 0 === d && (d = 5e3), void 0 === v && (v = 100), void 0 === s && (s = 100), void 0 === a && (a = 0), void 0 === u && (u = "frequency"), void 0 === p && (p = 44100), void 0 === h && (h = .2), this.algorithms.SpsModelAnal(o, t, i, r, e, n, d, v, s, a, u, p, h)
		}, t.prototype.SpsModelSynth = function (o, t, i, r, e, n, d, v) {
			return void 0 === e && (e = 2048), void 0 === n && (n = 512), void 0 === d && (d = 44100), void 0 === v && (v = .2), this.algorithms.SpsModelSynth(o, t, i, r, e, n, d, v)
		}, t.prototype.StartStopCut = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = 256), void 0 === i && (i = 256), void 0 === r && (r = 10), void 0 === e && (e = 10), void 0 === n && (n = 44100), void 0 === d && (d = -60), this.algorithms.StartStopCut(o, t, i, r, e, n, d)
		}, t.prototype.StartStopSilence = function (o, t) {
			return void 0 === t && (t = -60), this.algorithms.StartStopSilence(o, t)
		}, t.prototype.StochasticModelAnal = function (o, t, i, r, e) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 512), void 0 === r && (r = 44100), void 0 === e && (e = .2), this.algorithms.StochasticModelAnal(o, t, i, r, e)
		}, t.prototype.StochasticModelSynth = function (o, t, i, r, e) {
			return void 0 === t && (t = 2048), void 0 === i && (i = 512), void 0 === r && (r = 44100), void 0 === e && (e = .2), this.algorithms.StochasticModelSynth(o, t, i, r, e)
		}, t.prototype.StrongDecay = function (o, t) {
			return void 0 === t && (t = 44100), this.algorithms.StrongDecay(o, t)
		}, t.prototype.StrongPeak = function (o) {
			return this.algorithms.StrongPeak(o)
		}, t.prototype.SuperFluxExtractor = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = 20), void 0 === i && (i = 2048), void 0 === r && (r = 256), void 0 === e && (e = 16), void 0 === n && (n = 44100), void 0 === d && (d = .05), this.algorithms.SuperFluxExtractor(o, t, i, r, e, n, d)
		}, t.prototype.SuperFluxNovelty = function (o, t, i) {
			return void 0 === t && (t = 3), void 0 === i && (i = 2), this.algorithms.SuperFluxNovelty(o, t, i)
		}, t.prototype.SuperFluxPeaks = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = 30), void 0 === i && (i = 172), void 0 === r && (r = 100), void 0 === e && (e = 30), void 0 === n && (n = 16), void 0 === d && (d = .05), this.algorithms.SuperFluxPeaks(o, t, i, r, e, n, d)
		}, t.prototype.TCToTotal = function (o) {
			return this.algorithms.TCToTotal(o)
		}, t.prototype.TempoScaleBands = function (o, t, i) {
			void 0 === t && (t = [2, 3, 2, 1, 1.20000004768, 2, 3, 2.5]), void 0 === i && (i = 512);
			for (var r = new this.module.VectorFloat, e = 0; e < r.size(); e++) r.push_back(t[e]);
			return this.algorithms.TempoScaleBands(o, r, i)
		}, t.prototype.TempoTap = function (o, t, i, r, e, n, d, v) {
			void 0 === t && (t = 1024), void 0 === i && (i = 256), void 0 === r && (r = 208), void 0 === e && (e = 40), void 0 === n && (n = 1024), void 0 === d && (d = 44100), void 0 === v && (v = []);
			for (var s = new this.module.VectorFloat, a = 0; a < s.size(); a++) s.push_back(v[a]);
			return this.algorithms.TempoTap(o, t, i, r, e, n, d, s)
		}, t.prototype.TempoTapDegara = function (o, t, i, r, e) {
			return void 0 === t && (t = 208), void 0 === i && (i = 40), void 0 === r && (r = "none"), void 0 === e && (e = 86.1328), this.algorithms.TempoTapDegara(o, t, i, r, e)
		}, t.prototype.TempoTapMaxAgreement = function (o) {
			return this.algorithms.TempoTapMaxAgreement(o)
		}, t.prototype.TempoTapTicks = function (o, t, i, r, e) {
			return void 0 === i && (i = 512), void 0 === r && (r = 256), void 0 === e && (e = 44100), this.algorithms.TempoTapTicks(o, t, i, r, e)
		}, t.prototype.TonalExtractor = function (o, t, i, r) {
			return void 0 === t && (t = 4096), void 0 === i && (i = 2048), void 0 === r && (r = 440), this.algorithms.TonalExtractor(o, t, i, r)
		}, t.prototype.TonicIndianArtMusic = function (o, t, i, r, e, n, d, v, s, a, u, p, h) {
			return void 0 === t && (t = 10), void 0 === i && (i = 2048), void 0 === r && (r = .85), void 0 === e && (e = 512), void 0 === n && (n = 1), void 0 === d && (d = 40), void 0 === v && (v = 375), void 0 === s && (s = 100), void 0 === a && (a = 20), void 0 === u && (u = 5), void 0 === p && (p = 55), void 0 === h && (h = 44100), this.algorithms.TonicIndianArtMusic(o, t, i, r, e, n, d, v, s, a, u, p, h)
		}, t.prototype.TriangularBands = function (o, t, i, r, e, n, d, v) {
			void 0 === t && (t = [21.533203125, 43.06640625, 64.599609375, 86.1328125, 107.666015625, 129.19921875, 150.732421875, 172.265625, 193.798828125, 215.33203125, 236.865234375, 258.3984375, 279.931640625, 301.46484375, 322.998046875, 344.53125, 366.064453125, 387.59765625, 409.130859375, 430.6640625, 452.197265625, 473.73046875, 495.263671875, 516.796875, 538.330078125, 559.86328125, 581.396484375, 602.9296875, 624.462890625, 645.99609375, 667.529296875, 689.0625, 710.595703125, 732.12890625, 753.662109375, 775.1953125, 796.728515625, 839.794921875, 861.328125, 882.861328125, 904.39453125, 925.927734375, 968.994140625, 990.52734375, 1012.06054688, 1055.12695312, 1076.66015625, 1098.19335938, 1141.25976562, 1184.32617188, 1205.859375, 1248.92578125, 1270.45898438, 1313.52539062, 1356.59179688, 1399.65820312, 1442.72460938, 1485.79101562, 1528.85742188, 1571.92382812, 1614.99023438, 1658.05664062, 1701.12304688, 1765.72265625, 1808.7890625, 1873.38867188, 1916.45507812, 1981.0546875, 2024.12109375, 2088.72070312, 2153.3203125, 2217.91992188, 2282.51953125, 2347.11914062, 2411.71875, 2497.8515625, 2562.45117188, 2627.05078125, 2713.18359375, 2799.31640625, 2885.44921875, 2950.04882812, 3036.18164062, 3143.84765625, 3229.98046875, 3316.11328125, 3423.77929688, 3509.91210938, 3617.578125, 3725.24414062, 3832.91015625, 3940.57617188, 4069.77539062, 4177.44140625, 4306.640625, 4435.83984375, 4565.0390625, 4694.23828125, 4844.97070312, 4974.16992188, 5124.90234375, 5275.63476562, 5426.3671875, 5577.09960938, 5749.36523438, 5921.63085938, 6093.89648438, 6266.16210938, 6459.9609375, 6653.75976562, 6847.55859375, 7041.35742188, 7256.68945312, 7450.48828125, 7687.35351562, 7902.68554688, 8139.55078125, 8376.41601562, 8613.28125, 8871.6796875, 9130.078125, 9388.4765625, 9668.40820312, 9948.33984375, 10249.8046875, 10551.2695312, 10852.734375, 11175.7324219, 11498.7304688, 11843.2617188, 12187.7929688, 12553.8574219, 12919.921875, 13285.9863281, 13673.5839844, 14082.7148438, 14491.8457031, 14922.5097656, 15353.1738281, 15805.3710938, 16257.5683594]), void 0 === i && (i = 1025), void 0 === r && (r = !0), void 0 === e && (e = "unit_sum"), void 0 === n && (n = 44100), void 0 === d && (d = "power"), void 0 === v && (v = "linear");
			for (var s = new this.module.VectorFloat, a = 0; a < s.size(); a++) s.push_back(t[a]);
			return this.algorithms.TriangularBands(o, s, i, r, e, n, d, v)
		}, t.prototype.TriangularBarkBands = function (o, t, i, r, e, n, d, v, s, a) {
			return void 0 === t && (t = 22050), void 0 === i && (i = 1025), void 0 === r && (r = !1), void 0 === e && (e = 0), void 0 === n && (n = "unit_sum"), void 0 === d && (d = 24), void 0 === v && (v = 44100), void 0 === s && (s = "power"), void 0 === a && (a = "warping"), this.algorithms.TriangularBarkBands(o, t, i, r, e, n, d, v, s, a)
		}, t.prototype.Trimmer = function (o, t, i, r, e) {
			return void 0 === t && (t = !1), void 0 === i && (i = 1e6), void 0 === r && (r = 44100), void 0 === e && (e = 0), this.algorithms.Trimmer(o, t, i, r, e)
		}, t.prototype.Tristimulus = function (o, t) {
			return this.algorithms.Tristimulus(o, t)
		}, t.prototype.TruePeakDetector = function (o, t, i, r, e, n, d, v) {
			return void 0 === t && (t = !1), void 0 === i && (i = !1), void 0 === r && (r = 4), void 0 === e && (e = 1), void 0 === n && (n = 44100), void 0 === d && (d = -2e-4), void 0 === v && (v = 4), this.algorithms.TruePeakDetector(o, t, i, r, e, n, d, v)
		}, t.prototype.TuningFrequency = function (o, t, i) {
			return void 0 === i && (i = 1), this.algorithms.TuningFrequency(o, t, i)
		}, t.prototype.TuningFrequencyExtractor = function (o, t, i) {
			return void 0 === t && (t = 4096), void 0 === i && (i = 2048), this.algorithms.TuningFrequencyExtractor(o, t, i)
		}, t.prototype.UnaryOperator = function (o, t, i, r) {
			return void 0 === t && (t = 1), void 0 === i && (i = 0), void 0 === r && (r = "identity"), this.algorithms.UnaryOperator(o, t, i, r)
		}, t.prototype.UnaryOperatorStream = function (o, t, i, r) {
			return void 0 === t && (t = 1), void 0 === i && (i = 0), void 0 === r && (r = "identity"), this.algorithms.UnaryOperatorStream(o, t, i, r)
		}, t.prototype.Variance = function (o) {
			return this.algorithms.Variance(o)
		}, t.prototype.Vibrato = function (o, t, i, r, e, n) {
			return void 0 === t && (t = 250), void 0 === i && (i = 8), void 0 === r && (r = 50), void 0 === e && (e = 4), void 0 === n && (n = 344.531), this.algorithms.Vibrato(o, t, i, r, e, n)
		}, t.prototype.WarpedAutoCorrelation = function (o, t, i) {
			return void 0 === t && (t = 1), void 0 === i && (i = 44100), this.algorithms.WarpedAutoCorrelation(o, t, i)
		}, t.prototype.Welch = function (o, t, i, r, e, n, d) {
			return void 0 === t && (t = 10), void 0 === i && (i = 1024), void 0 === r && (r = 512), void 0 === e && (e = 44100), void 0 === n && (n = "density"), void 0 === d && (d = "hann"), this.algorithms.Welch(o, t, i, r, e, n, d)
		}, t.prototype.Windowing = function (o, t, i, r, e, n) {
			return void 0 === t && (t = !0), void 0 === i && (i = 1024), void 0 === r && (r = "hann"), void 0 === e && (e = 0), void 0 === n && (n = !0), this.algorithms.Windowing(o, t, i, r, e, n)
		}, t.prototype.ZeroCrossingRate = function (o, t) {
			return void 0 === t && (t = 0), this.algorithms.ZeroCrossingRate(o, t)
		}, t
	}()
}();