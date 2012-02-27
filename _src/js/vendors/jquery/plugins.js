/**
 * Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 * 
 * Requires: 1.2.2+
 * @module: plugins
 */

(function ($) {

	var types = ['DOMMouseScroll', 'mousewheel'];

	$.event.special.mousewheel = {
		setup: function () {
			if (this.addEventListener) {
				for (var i = types.length; i;) {
					this.addEventListener(types[--i], handler, false);
				}
			} else {
				this.onmousewheel = handler;
			}
		},

		teardown: function () {
			if (this.removeEventListener) {
				for (var i = types.length; i;) {
					this.removeEventListener(types[--i], handler, false);
				}
			} else {
				this.onmousewheel = null;
			}
		}
	};

	$.fn.extend({
		mousewheel: function (fn) {
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
		},

		unmousewheel: function (fn) {
			return this.unbind("mousewheel", fn);
		}
	});


	function handler(event) {
		var orgEvent = event || window.event,
			args = [].slice.call(arguments, 1),
			delta = 0,
			returnValue = true,
			deltaX = 0,
			deltaY = 0;
		event = $.event.fix(orgEvent);
		event.type = "mousewheel";

		// Old school scrollwheel delta
		if (event.wheelDelta) {
			delta = event.wheelDelta / 120;
		}
		if (event.detail) {
			delta = -event.detail / 3;
		}

		// New school multidimensional scroll (touchpads) deltas
		deltaY = delta;

		// Gecko
		if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
			deltaY = 0;
			deltaX = -1 * delta;
		}

		// Webkit
		if (orgEvent.wheelDeltaY !== undefined) {
			deltaY = orgEvent.wheelDeltaY / 120;
		}
		if (orgEvent.wheelDeltaX !== undefined) {
			deltaX = -1 * orgEvent.wheelDeltaX / 120;
		}

		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		return $.event.handle.apply(this, args);
	}

})(jQuery);

/*
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function (b, a, c) {
	b.fn.jScrollPane = function (e) {
		function d(D, O) {
			var az, Q = this,
				Y, ak, v, am, T, Z, y, q, aA, aF, av, i, I, h, j, aa, U, aq, X, t, A, ar, af, an, G, l, au, ay, x, aw, aI, f, L, aj = true,
				P = true,
				aH = false,
				k = false,
				ap = D.clone(false, false).empty(),
				ac = b.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
			aI = D.css("paddingTop") + " " + D.css("paddingRight") + " " + D.css("paddingBottom") + " " + D.css("paddingLeft");
			f = (parseInt(D.css("paddingLeft"), 10) || 0) + (parseInt(D.css("paddingRight"), 10) || 0);

			function at(aR) {
				var aM, aO, aN, aK, aJ, aQ, aP = false,
					aL = false;
				az = aR;
				if (Y === c) {
					aJ = D.scrollTop();
					aQ = D.scrollLeft();
					D.css({
						overflow: "hidden",
						padding: 0
					});
					ak = D.innerWidth() + f;
					v = D.innerHeight();
					D.width(ak);
					Y = b('<div class="jspPane" />').css("padding", aI).append(D.children());
					am = b('<div class="jspContainer" />').css({
						width: ak + "px",
						height: v + "px"
					}).append(Y).appendTo(D)
				} else {
					D.css("width", "");
					aP = az.stickToBottom && K();
					aL = az.stickToRight && B();
					aK = D.innerWidth() + f != ak || D.outerHeight() != v;
					if (aK) {
						ak = D.innerWidth() + f;
						v = D.innerHeight();
						am.css({
							width: ak + "px",
							height: v + "px"
						})
					}
					if (!aK && L == T && Y.outerHeight() == Z) {
						D.width(ak);
						return
					}
					L = T;
					Y.css("width", "");
					D.width(ak);
					am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
				}
				Y.css("overflow", "auto");
				if (aR.contentWidth) {
					T = aR.contentWidth
				} else {
					T = Y[0].scrollWidth
				}
				Z = Y[0].scrollHeight;
				Y.css("overflow", "");
				y = T / ak;
				q = Z / v;
				aA = q > 1;
				aF = y > 1;
				if (!(aF || aA)) {
					D.removeClass("jspScrollable");
					Y.css({
						top: 0,
						width: am.width() - f
					});
					n();
					E();
					R();
					w();
					ai()
				} else {
					D.addClass("jspScrollable");
					aM = az.maintainPosition && (I || aa);
					if (aM) {
						aO = aD();
						aN = aB()
					}
					aG();
					z();
					F();
					if (aM) {
						N(aL ? (T - ak) : aO, false);
						M(aP ? (Z - v) : aN, false)
					}
					J();
					ag();
					ao();
					if (az.enableKeyboardNavigation) {
						S()
					}
					if (az.clickOnTrack) {
						p()
					}
					C();
					if (az.hijackInternalLinks) {
						m()
					}
				}
				if (az.autoReinitialise && !aw) {
					aw = setInterval(function () {
						at(az)
					}, az.autoReinitialiseDelay)
				} else {
					if (!az.autoReinitialise && aw) {
						clearInterval(aw)
					}
				}
				aJ && D.scrollTop(0) && M(aJ, false);
				aQ && D.scrollLeft(0) && N(aQ, false);
				D.trigger("jsp-initialised", [aF || aA])
			}
			function aG() {
				if (aA) {
					am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'), b('<div class="jspDragBottom" />'))), b('<div class="jspCap jspCapBottom" />')));
					U = am.find(">.jspVerticalBar");
					aq = U.find(">.jspTrack");
					av = aq.find(">.jspDrag");
					if (az.showArrows) {
						ar = b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", aE(0, -1)).bind("click.jsp", aC);
						af = b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", aE(0, 1)).bind("click.jsp", aC);
						if (az.arrowScrollOnHover) {
							ar.bind("mouseover.jsp", aE(0, -1, ar));
							af.bind("mouseover.jsp", aE(0, 1, af))
						}
						al(aq, az.verticalArrowPositions, ar, af)
					}
					t = v;
					am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () {
						t -= b(this).outerHeight()
					});
					av.hover(function () {
						av.addClass("jspHover")
					}, function () {
						av.removeClass("jspHover")
					}).bind("mousedown.jsp", function (aJ) {
						b("html").bind("dragstart.jsp selectstart.jsp", aC);
						av.addClass("jspActive");
						var s = aJ.pageY - av.position().top;
						b("html").bind("mousemove.jsp", function (aK) {
							V(aK.pageY - s, false)
						}).bind("mouseup.jsp mouseleave.jsp", ax);
						return false
					});
					o()
				}
			}
			function o() {
				aq.height(t + "px");
				I = 0;
				X = az.verticalGutter + aq.outerWidth();
				Y.width(ak - X - f);
				try {
					if (U.position().left === 0) {
						Y.css("margin-left", X + "px")
					}
				} catch (s) {}
			}
			function z() {
				if (aF) {
					am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'), b('<div class="jspDragRight" />'))), b('<div class="jspCap jspCapRight" />')));
					an = am.find(">.jspHorizontalBar");
					G = an.find(">.jspTrack");
					h = G.find(">.jspDrag");
					if (az.showArrows) {
						ay = b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", aE(-1, 0)).bind("click.jsp", aC);
						x = b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", aE(1, 0)).bind("click.jsp", aC);
						if (az.arrowScrollOnHover) {
							ay.bind("mouseover.jsp", aE(-1, 0, ay));
							x.bind("mouseover.jsp", aE(1, 0, x))
						}
						al(G, az.horizontalArrowPositions, ay, x)
					}
					h.hover(function () {
						h.addClass("jspHover")
					}, function () {
						h.removeClass("jspHover")
					}).bind("mousedown.jsp", function (aJ) {
						b("html").bind("dragstart.jsp selectstart.jsp", aC);
						h.addClass("jspActive");
						var s = aJ.pageX - h.position().left;
						b("html").bind("mousemove.jsp", function (aK) {
							W(aK.pageX - s, false)
						}).bind("mouseup.jsp mouseleave.jsp", ax);
						return false
					});
					l = am.innerWidth();
					ah()
				}
			}
			function ah() {
				am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () {
					l -= b(this).outerWidth()
				});
				G.width(l + "px");
				aa = 0
			}
			function F() {
				if (aF && aA) {
					var aJ = G.outerHeight(),
						s = aq.outerWidth();
					t -= aJ;
					b(an).find(">.jspCap:visible,>.jspArrow").each(function () {
						l += b(this).outerWidth()
					});
					l -= s;
					v -= s;
					ak -= aJ;
					G.parent().append(b('<div class="jspCorner" />').css("width", aJ + "px"));
					o();
					ah()
				}
				if (aF) {
					Y.width((am.outerWidth() - f) + "px")
				}
				Z = Y.outerHeight();
				q = Z / v;
				if (aF) {
					au = Math.ceil(1 / y * l);
					if (au > az.horizontalDragMaxWidth) {
						au = az.horizontalDragMaxWidth
					} else {
						if (au < az.horizontalDragMinWidth) {
							au = az.horizontalDragMinWidth
						}
					}
					h.width(au + "px");
					j = l - au;
					ae(aa)
				}
				if (aA) {
					A = Math.ceil(1 / q * t);
					if (A > az.verticalDragMaxHeight) {
						A = az.verticalDragMaxHeight
					} else {
						if (A < az.verticalDragMinHeight) {
							A = az.verticalDragMinHeight
						}
					}
					av.height(A + "px");
					i = t - A;
					ad(I)
				}
			}
			function al(aK, aM, aJ, s) {
				var aO = "before",
					aL = "after",
					aN;
				if (aM == "os") {
					aM = /Mac/.test(navigator.platform) ? "after" : "split"
				}
				if (aM == aO) {
					aL = aM
				} else {
					if (aM == aL) {
						aO = aM;
						aN = aJ;
						aJ = s;
						s = aN
					}
				}
				aK[aO](aJ)[aL](s)
			}
			function aE(aJ, s, aK) {
				return function () {
					H(aJ, s, this, aK);
					this.blur();
					return false
				}
			}
			function H(aM, aL, aP, aO) {
				aP = b(aP).addClass("jspActive");
				var aN, aK, aJ = true,
					s = function () {
						if (aM !== 0) {
							Q.scrollByX(aM * az.arrowButtonSpeed)
						}
						if (aL !== 0) {
							Q.scrollByY(aL * az.arrowButtonSpeed)
						}
						aK = setTimeout(s, aJ ? az.initialDelay : az.arrowRepeatFreq);
						aJ = false
					};
				s();
				aN = aO ? "mouseout.jsp" : "mouseup.jsp";
				aO = aO || b("html");
				aO.bind(aN, function () {
					aP.removeClass("jspActive");
					aK && clearTimeout(aK);
					aK = null;
					aO.unbind(aN)
				})
			}
			function p() {
				w();
				if (aA) {
					aq.bind("mousedown.jsp", function (aO) {
						if (aO.originalTarget === c || aO.originalTarget == aO.currentTarget) {
							var aM = b(this),
								aP = aM.offset(),
								aN = aO.pageY - aP.top - I,
								aK, aJ = true,
								s = function () {
									var aS = aM.offset(),
										aT = aO.pageY - aS.top - A / 2,
										aQ = v * az.scrollPagePercent,
										aR = i * aQ / (Z - v);
									if (aN < 0) {
										if (I - aR > aT) {
											Q.scrollByY(-aQ)
										} else {
											V(aT)
										}
									} else {
										if (aN > 0) {
											if (I + aR < aT) {
												Q.scrollByY(aQ)
											} else {
												V(aT)
											}
										} else {
											aL();
											return
										}
									}
									aK = setTimeout(s, aJ ? az.initialDelay : az.trackClickRepeatFreq);
									aJ = false
								},
								aL = function () {
									aK && clearTimeout(aK);
									aK = null;
									b(document).unbind("mouseup.jsp", aL)
								};
							s();
							b(document).bind("mouseup.jsp", aL);
							return false
						}
					})
				}
				if (aF) {
					G.bind("mousedown.jsp", function (aO) {
						if (aO.originalTarget === c || aO.originalTarget == aO.currentTarget) {
							var aM = b(this),
								aP = aM.offset(),
								aN = aO.pageX - aP.left - aa,
								aK, aJ = true,
								s = function () {
									var aS = aM.offset(),
										aT = aO.pageX - aS.left - au / 2,
										aQ = ak * az.scrollPagePercent,
										aR = j * aQ / (T - ak);
									if (aN < 0) {
										if (aa - aR > aT) {
											Q.scrollByX(-aQ)
										} else {
											W(aT)
										}
									} else {
										if (aN > 0) {
											if (aa + aR < aT) {
												Q.scrollByX(aQ)
											} else {
												W(aT)
											}
										} else {
											aL();
											return
										}
									}
									aK = setTimeout(s, aJ ? az.initialDelay : az.trackClickRepeatFreq);
									aJ = false
								},
								aL = function () {
									aK && clearTimeout(aK);
									aK = null;
									b(document).unbind("mouseup.jsp", aL)
								};
							s();
							b(document).bind("mouseup.jsp", aL);
							return false
						}
					})
				}
			}
			function w() {
				if (G) {
					G.unbind("mousedown.jsp")
				}
				if (aq) {
					aq.unbind("mousedown.jsp")
				}
			}
			function ax() {
				b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
				if (av) {
					av.removeClass("jspActive")
				}
				if (h) {
					h.removeClass("jspActive")
				}
			}
			function V(s, aJ) {
				if (!aA) {
					return
				}
				if (s < 0) {
					s = 0
				} else {
					if (s > i) {
						s = i
					}
				}
				if (aJ === c) {
					aJ = az.animateScroll
				}
				if (aJ) {
					Q.animate(av, "top", s, ad)
				} else {
					av.css("top", s);
					ad(s)
				}
			}
			function ad(aJ) {
				if (aJ === c) {
					aJ = av.position().top
				}
				am.scrollTop(0);
				I = aJ;
				var aM = I === 0,
					aK = I == i,
					aL = aJ / i,
					s = -aL * (Z - v);
				if (aj != aM || aH != aK) {
					aj = aM;
					aH = aK;
					D.trigger("jsp-arrow-change", [aj, aH, P, k])
				}
				u(aM, aK);
				Y.css("top", s);
				D.trigger("jsp-scroll-y", [-s, aM, aK]).trigger("scroll")
			}
			function W(aJ, s) {
				if (!aF) {
					return
				}
				if (aJ < 0) {
					aJ = 0
				} else {
					if (aJ > j) {
						aJ = j
					}
				}
				if (s === c) {
					s = az.animateScroll
				}
				if (s) {
					Q.animate(h, "left", aJ, ae)
				} else {
					h.css("left", aJ);
					ae(aJ)
				}
			}
			function ae(aJ) {
				if (aJ === c) {
					aJ = h.position().left
				}
				am.scrollTop(0);
				aa = aJ;
				var aM = aa === 0,
					aL = aa == j,
					aK = aJ / j,
					s = -aK * (T - ak);
				if (P != aM || k != aL) {
					P = aM;
					k = aL;
					D.trigger("jsp-arrow-change", [aj, aH, P, k])
				}
				r(aM, aL);
				Y.css("left", s);
				D.trigger("jsp-scroll-x", [-s, aM, aL]).trigger("scroll")
			}
			function u(aJ, s) {
				if (az.showArrows) {
					ar[aJ ? "addClass" : "removeClass"]("jspDisabled");
					af[s ? "addClass" : "removeClass"]("jspDisabled")
				}
			}
			function r(aJ, s) {
				if (az.showArrows) {
					ay[aJ ? "addClass" : "removeClass"]("jspDisabled");
					x[s ? "addClass" : "removeClass"]("jspDisabled")
				}
			}
			function M(s, aJ) {
				var aK = s / (Z - v);
				V(aK * i, aJ)
			}
			function N(aJ, s) {
				var aK = aJ / (T - ak);
				W(aK * j, s)
			}
			function ab(aW, aR, aK) {
				var aO, aL, aM, s = 0,
					aV = 0,
					aJ, aQ, aP, aT, aS, aU;
				try {
					aO = b(aW)
				} catch (aN) {
					return
				}
				aL = aO.outerHeight();
				aM = aO.outerWidth();
				am.scrollTop(0);
				am.scrollLeft(0);
				while (!aO.is(".jspPane")) {
					s += aO.position().top;
					aV += aO.position().left;
					aO = aO.offsetParent();
					if (/^body|html$/i.test(aO[0].nodeName)) {
						return
					}
				}
				aJ = aB();
				aP = aJ + v;
				if (s < aJ || aR) {
					aS = s - az.verticalGutter
				} else {
					if (s + aL > aP) {
						aS = s - v + aL + az.verticalGutter
					}
				}
				if (aS) {
					M(aS, aK)
				}
				aQ = aD();
				aT = aQ + ak;
				if (aV < aQ || aR) {
					aU = aV - az.horizontalGutter
				} else {
					if (aV + aM > aT) {
						aU = aV - ak + aM + az.horizontalGutter
					}
				}
				if (aU) {
					N(aU, aK)
				}
			}
			function aD() {
				return -Y.position().left
			}
			function aB() {
				return -Y.position().top
			}
			function K() {
				var s = Z - v;
				return (s > 20) && (s - aB() < 10)
			}
			function B() {
				var s = T - ak;
				return (s > 20) && (s - aD() < 10)
			}
			function ag() {
				am.unbind(ac).bind(ac, function (aM, aN, aL, aJ) {
					var aK = aa,
						s = I;
					Q.scrollBy(aL * az.mouseWheelSpeed, -aJ * az.mouseWheelSpeed, false);
					return aK == aa && s == I
				})
			}
			function n() {
				am.unbind(ac)
			}
			function aC() {
				return false
			}
			function J() {
				Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function (s) {
					ab(s.target, false)
				})
			}
			function E() {
				Y.find(":input,a").unbind("focus.jsp")
			}
			function S() {
				var s, aJ, aL = [];
				aF && aL.push(an[0]);
				aA && aL.push(U[0]);
				Y.focus(function () {
					D.focus()
				});
				D.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function (aO) {
					if (aO.target !== this && !(aL.length && b(aO.target).closest(aL).length)) {
						return
					}
					var aN = aa,
						aM = I;
					switch (aO.keyCode) {
					case 40:
					case 38:
					case 34:
					case 32:
					case 33:
					case 39:
					case 37:
						s = aO.keyCode;
						aK();
						break;
					case 35:
						M(Z - v);
						s = null;
						break;
					case 36:
						M(0);
						s = null;
						break
					}
					aJ = aO.keyCode == s && aN != aa || aM != I;
					return !aJ
				}).bind("keypress.jsp", function (aM) {
					if (aM.keyCode == s) {
						aK()
					}
					return !aJ
				});
				if (az.hideFocus) {
					D.css("outline", "none");
					if ("hideFocus" in am[0]) {
						D.attr("hideFocus", true)
					}
				} else {
					D.css("outline", "");
					if ("hideFocus" in am[0]) {
						D.attr("hideFocus", false)
					}
				}
				function aK() {
					var aN = aa,
						aM = I;
					switch (s) {
					case 40:
						Q.scrollByY(az.keyboardSpeed, false);
						break;
					case 38:
						Q.scrollByY(-az.keyboardSpeed, false);
						break;
					case 34:
					case 32:
						Q.scrollByY(v * az.scrollPagePercent, false);
						break;
					case 33:
						Q.scrollByY(-v * az.scrollPagePercent, false);
						break;
					case 39:
						Q.scrollByX(az.keyboardSpeed, false);
						break;
					case 37:
						Q.scrollByX(-az.keyboardSpeed, false);
						break
					}
					aJ = aN != aa || aM != I;
					return aJ
				}
			}
			function R() {
				D.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
			}
			function C() {
				if (location.hash && location.hash.length > 1) {
					var aL, aJ, aK = escape(location.hash);
					try {
						aL = b(aK)
					} catch (s) {
						return
					}
					if (aL.length && Y.find(aK)) {
						if (am.scrollTop() === 0) {
							aJ = setInterval(function () {
								if (am.scrollTop() > 0) {
									ab(aK, true);
									b(document).scrollTop(am.position().top);
									clearInterval(aJ)
								}
							}, 50)
						} else {
							ab(aK, true);
							b(document).scrollTop(am.position().top)
						}
					}
				}
			}
			function ai() {
				b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")
			}
			function m() {
				ai();
				b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack", function () {
					var s = this.href.split("#"),
						aJ;
					if (s.length > 1) {
						aJ = s[1];
						if (aJ.length > 0 && Y.find("#" + aJ).length > 0) {
							ab("#" + aJ, true);
							return false
						}
					}
				})
			}
			function ao() {
				var aK, aJ, aM, aL, aN, s = false;
				am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function (aO) {
					var aP = aO.originalEvent.touches[0];
					aK = aD();
					aJ = aB();
					aM = aP.pageX;
					aL = aP.pageY;
					aN = false;
					s = true
				}).bind("touchmove.jsp", function (aR) {
					if (!s) {
						return
					}
					var aQ = aR.originalEvent.touches[0],
						aP = aa,
						aO = I;
					Q.scrollTo(aK + aM - aQ.pageX, aJ + aL - aQ.pageY);
					aN = aN || Math.abs(aM - aQ.pageX) > 5 || Math.abs(aL - aQ.pageY) > 5;
					return aP == aa && aO == I
				}).bind("touchend.jsp", function (aO) {
					s = false
				}).bind("click.jsp-touchclick", function (aO) {
					if (aN) {
						aN = false;
						return false
					}
				})
			}
			function g() {
				var s = aB(),
					aJ = aD();
				D.removeClass("jspScrollable").unbind(".jsp");
				D.replaceWith(ap.append(Y.children()));
				ap.scrollTop(s);
				ap.scrollLeft(aJ)
			}
			b.extend(Q, {
				reinitialise: function (aJ) {
					aJ = b.extend({}, az, aJ);
					at(aJ)
				},
				scrollToElement: function (aK, aJ, s) {
					ab(aK, aJ, s)
				},
				scrollTo: function (aK, s, aJ) {
					N(aK, aJ);
					M(s, aJ)
				},
				scrollToX: function (aJ, s) {
					N(aJ, s)
				},
				scrollToY: function (s, aJ) {
					M(s, aJ)
				},
				scrollToPercentX: function (aJ, s) {
					N(aJ * (T - ak), s)
				},
				scrollToPercentY: function (aJ, s) {
					M(aJ * (Z - v), s)
				},
				scrollBy: function (aJ, s, aK) {
					Q.scrollByX(aJ, aK);
					Q.scrollByY(s, aK)
				},
				scrollByX: function (s, aK) {
					var aJ = aD() + Math[s < 0 ? "floor" : "ceil"](s),
						aL = aJ / (T - ak);
					W(aL * j, aK)
				},
				scrollByY: function (s, aK) {
					var aJ = aB() + Math[s < 0 ? "floor" : "ceil"](s),
						aL = aJ / (Z - v);
					V(aL * i, aK)
				},
				positionDragX: function (s, aJ) {
					W(s, aJ)
				},
				positionDragY: function (aJ, s) {
					V(aJ, s)
				},
				animate: function (aJ, aM, s, aL) {
					var aK = {};
					aK[aM] = s;
					aJ.animate(aK, {
						duration: az.animateDuration,
						easing: az.animateEase,
						queue: false,
						step: aL
					})
				},
				getContentPositionX: function () {
					return aD()
				},
				getContentPositionY: function () {
					return aB()
				},
				getContentWidth: function () {
					return T
				},
				getContentHeight: function () {
					return Z
				},
				getPercentScrolledX: function () {
					return aD() / (T - ak)
				},
				getPercentScrolledY: function () {
					return aB() / (Z - v)
				},
				getIsScrollableH: function () {
					return aF
				},
				getIsScrollableV: function () {
					return aA
				},
				getContentPane: function () {
					return Y
				},
				scrollToBottom: function (s) {
					V(i, s)
				},
				hijackInternalLinks: function () {
					m()
				},
				destroy: function () {
					g()
				}
			});
			at(O)
		}
		e = b.extend({}, b.fn.jScrollPane.defaults, e);
		b.each(["mouseWheelSpeed", "arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () {
			e[this] = e[this] || e.speed
		});
		return this.each(function () {
			var f = b(this),
				g = f.data("jsp");
			if (g) {
				g.reinitialise(e)
			} else {
				g = new d(f, e);
				f.data("jsp", g)
			}
		})
	};
	b.fn.jScrollPane.defaults = {
		showArrows: false,
		maintainPosition: true,
		stickToBottom: false,
		stickToRight: false,
		clickOnTrack: true,
		autoReinitialise: false,
		autoReinitialiseDelay: 500,
		verticalDragMinHeight: 0,
		verticalDragMaxHeight: 99999,
		horizontalDragMinWidth: 0,
		horizontalDragMaxWidth: 99999,
		contentWidth: c,
		animateScroll: false,
		animateDuration: 300,
		animateEase: "linear",
		hijackInternalLinks: false,
		verticalGutter: 4,
		horizontalGutter: 4,
		mouseWheelSpeed: 0,
		arrowButtonSpeed: 0,
		arrowRepeatFreq: 50,
		arrowScrollOnHover: false,
		trackClickSpeed: 0,
		trackClickRepeatFreq: 70,
		verticalArrowPositions: "split",
		horizontalArrowPositions: "split",
		enableKeyboardNavigation: true,
		hideFocus: false,
		keyboardSpeed: 0,
		initialDelay: 300,
		speed: 30,
		scrollPagePercent: 0.8
	}
})(jQuery, this);


/*
    jQuery News Ticker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 2 of the License.
 
    jQuery News Ticker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with jQuery News Ticker.  If not, see <http://www.gnu.org/licenses/>.
*/
(function ($) {
	$.fn.ticker = function (options) {
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = $.extend({}, $.fn.ticker.defaults, options);

		// check that the passed element is actually in the DOM
		if ($(this).length == 0) {
			if (window.console && window.console.log) {
				window.console.log('Element does not exist in DOM!');
			}
			else {
				alert('Element does not exist in DOM!');
			}
			return false;
		}

		/* Get the id of the UL to get our news content from */
		var newsID = '#' + $(this).attr('id');

		/* Get the tag type - we will check this later to makde sure it is a UL tag */
		var tagType = $(this).get(0).tagName;

		return this.each(function () {
			// get a unique id for this ticker
			var uniqID = getUniqID();

			/* Internal vars */
			var settings = {
				position: 0,
				time: 0,
				distance: 0,
				newsArr: {},
				play: true,
				paused: false,
				contentLoaded: false,
				dom: {
					contentID: '#ticker-content-' + uniqID,
					titleID: '#ticker-title-' + uniqID,
					titleElem: '#ticker-title-' + uniqID + ' SPAN',
					tickerID: '#ticker-' + uniqID,
					wrapperID: '#ticker-wrapper-' + uniqID,
					revealID: '#ticker-swipe-' + uniqID,
					revealElem: '#ticker-swipe-' + uniqID + ' SPAN',
					controlsID: '#ticker-controls-' + uniqID,
					prevID: '#prev-' + uniqID,
					nextID: '#next-' + uniqID,
					playPauseID: '#play-pause-' + uniqID
				}
			};

			// if we are not using a UL, display an error message and stop any further execution
			if (tagType != 'UL' && tagType != 'OL' && opts.htmlFeed === true) {
				debugError('Cannot use <' + tagType.toLowerCase() + '> type of element for this plugin - must of type <ul> or <ol>');
				return false;
			}

			// set the ticker direction
			opts.direction == 'rtl' ? opts.direction = 'right' : opts.direction = 'left';

			// lets go...
			initialisePage(); /* Function to get the size of an Object*/

			function countSize(obj) {
				var size = 0,
					key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			};

			function getUniqID() {
				var newDate = new Date;
				return newDate.getTime();
			}

			/* Function for handling debug and error messages */

			function debugError(obj) {
				if (opts.debugMode) {
					if (window.console && window.console.log) {
						window.console.log(obj);
					}
					else {
						alert(obj);
					}
				}
			}

			/* Function to setup the page */

			function initialisePage() {
				// process the content for this ticker
				processContent();

				// add our HTML structure for the ticker to the DOM
				$(newsID).wrap('<div id="' + settings.dom.wrapperID.replace('#', '') + '"></div>');

				// remove any current content inside this ticker
				$(settings.dom.wrapperID).children().remove();

				$(settings.dom.wrapperID).append('<div id="' + settings.dom.tickerID.replace('#', '') + '" class="ticker"><div id="' + settings.dom.titleID.replace('#', '') + '" class="ticker-title"><span><!-- --></span></div><p id="' + settings.dom.contentID.replace('#', '') + '" class="ticker-content"></p><div id="' + settings.dom.revealID.replace('#', '') + '" class="ticker-swipe"><span><!-- --></span></div></div>');
				$(settings.dom.wrapperID).removeClass('no-js').addClass('ticker-wrapper has-js ' + opts.direction);
				// hide the ticker
				$(settings.dom.tickerElem + ',' + settings.dom.contentID).hide();
				// add the controls to the DOM if required
				if (opts.controls) {
					// add related events - set functions to run on given event
					$(settings.dom.controlsID).live('click mouseover mousedown mouseout mouseup', function (e) {
						var button = e.target.id;
						if (e.type == 'click') {
							switch (button) {
							case settings.dom.prevID.replace('#', ''):
								// show previous item
								settings.paused = true;
								$(settings.dom.playPauseID).addClass('paused');
								manualChangeContent('prev');
								break;
							case settings.dom.nextID.replace('#', ''):
								// show next item
								settings.paused = true;
								$(settings.dom.playPauseID).addClass('paused');
								manualChangeContent('next');
								break;
							case settings.dom.playPauseID.replace('#', ''):
								// play or pause the ticker
								if (settings.play == true) {
									settings.paused = true;
									$(settings.dom.playPauseID).addClass('paused');
									pauseTicker();
								}
								else {
									settings.paused = false;
									$(settings.dom.playPauseID).removeClass('paused');
									restartTicker();
								}
								break;
							}
						}
						else if (e.type == 'mouseover' && $('#' + button).hasClass('controls')) {
							$('#' + button).addClass('over');
						}
						else if (e.type == 'mousedown' && $('#' + button).hasClass('controls')) {
							$('#' + button).addClass('down');
						}
						else if (e.type == 'mouseup' && $('#' + button).hasClass('controls')) {
							$('#' + button).removeClass('down');
						}
						else if (e.type == 'mouseout' && $('#' + button).hasClass('controls')) {
							$('#' + button).removeClass('over');
						}
					});
					// add controls HTML to DOM
					$(settings.dom.wrapperID).append('<ul id="' + settings.dom.controlsID.replace('#', '') + '" class="ticker-controls"><li id="' + settings.dom.playPauseID.replace('#', '') + '" class="jnt-play-pause controls"><a href=""><!-- --></a></li><li id="' + settings.dom.prevID.replace('#', '') + '" class="jnt-prev controls"><a href=""><!-- --></a></li><li id="' + settings.dom.nextID.replace('#', '') + '" class="jnt-next controls"><a href=""><!-- --></a></li></ul>');
				}
				if (opts.displayType != 'fade') {
					// add mouse over on the content
					$(settings.dom.contentID).mouseover(function () {
						if (settings.paused == false) {
							pauseTicker();
						}
					}).mouseout(function () {
						if (settings.paused == false) {
							restartTicker();
						}
					});
				}
				// we may have to wait for the ajax call to finish here
				if (!opts.ajaxFeed) {
					setupContentAndTriggerDisplay();
				}
			}

			/* Start to process the content for this ticker */

			function processContent() {
				// check to see if we need to load content
				if (settings.contentLoaded == false) {
					// construct content
					if (opts.ajaxFeed) {
						if (opts.feedType == 'xml') {
							$.ajax({
								url: opts.feedUrl,
								cache: false,
								dataType: opts.feedType,
								async: true,
								success: function (data) {
									count = 0;
									// get the 'root' node
									for (var a = 0; a < data.childNodes.length; a++) {
										if (data.childNodes[a].nodeName == 'rss') {
											xmlContent = data.childNodes[a];
										}
									}
									// find the channel node
									for (var i = 0; i < xmlContent.childNodes.length; i++) {
										if (xmlContent.childNodes[i].nodeName == 'channel') {
											xmlChannel = xmlContent.childNodes[i];
										}
									}
									// for each item create a link and add the article title as the link text
									for (var x = 0; x < xmlChannel.childNodes.length; x++) {
										if (xmlChannel.childNodes[x].nodeName == 'item') {
											xmlItems = xmlChannel.childNodes[x];
											var title, link = false;
											for (var y = 0; y < xmlItems.childNodes.length; y++) {
												if (xmlItems.childNodes[y].nodeName == 'title') {
													title = xmlItems.childNodes[y].lastChild.nodeValue;
												}
												else if (xmlItems.childNodes[y].nodeName == 'link') {
													link = xmlItems.childNodes[y].lastChild.nodeValue;
												}
												if ((title !== false && title != '') && link !== false) {
													settings.newsArr['item-' + count] = {
														type: opts.titleText,
														content: '<a href="' + link + '">' + title + '</a>'
													};
													count++;
													title = false;
													link = false;
												}
											}
										}
									}
									// quick check here to see if we actually have any content - log error if not
									if (countSize(settings.newsArr < 1)) {
										debugError('Couldn\'t find any content from the XML feed for the ticker to use!');
										return false;
									}
									settings.contentLoaded = true;
									setupContentAndTriggerDisplay();
								}
							});
						}
						else {
							debugError('Code Me!');
						}
					}
					else if (opts.htmlFeed) {
						if ($(newsID + ' LI').length > 0) {
							$(newsID + ' LI').each(function (i) {
								// maybe this could be one whole object and not an array of objects?
								settings.newsArr['item-' + i] = {
									type: opts.titleText,
									content: $(this).html()
								};
							});
						}
						else {
							debugError('Couldn\'t find HTML any content for the ticker to use!');
							return false;
						}
					}
					else {
						debugError('The ticker is set to not use any types of content! Check the settings for the ticker.');
						return false;
					}
				}
			}

			function setupContentAndTriggerDisplay() {

				settings.contentLoaded = true;

				// update the ticker content with the correct item
				// insert news content into DOM
				$(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
				$(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);

				// set the next content item to be used - loop round if we are at the end of the content
				if (settings.position == (countSize(settings.newsArr) - 1)) {
					settings.position = 0;
				}
				else {
					settings.position++;
				}

				// get the values of content and set the time of the reveal (so all reveals have the same speed regardless of content size)
				distance = $(settings.dom.contentID).width();
				time = distance / opts.speed;

				// start the ticker animation						
				revealContent();
			}

			// slide back cover or fade in content

			function revealContent() {
				$(settings.dom.contentID).css('opacity', '1');
				if (settings.play) {
					// get the width of the title element to offset the content and reveal	
					var offset = $(settings.dom.titleID).width() + 20;

					$(settings.dom.revealID).css(opts.direction, offset + 'px');
					// show the reveal element and start the animation
					if (opts.displayType == 'fade') {
						// fade in effect ticker
						$(settings.dom.revealID).hide(0, function () {
							$(settings.dom.contentID).css(opts.direction, offset + 'px').fadeIn(opts.fadeInSpeed, postReveal);
						});
					}
					else if (opts.displayType == 'scroll') {
						// to code
					}
					else {
						// default bbc scroll effect
						$(settings.dom.revealElem).show(0, function () {
							$(settings.dom.contentID).css(opts.direction, offset + 'px').show();
							// set our animation direction
							animationAction = opts.direction == 'right' ? {
								marginRight: distance + 'px'
							} : {
								marginLeft: distance + 'px'
							};
							$(settings.dom.revealID).css('margin-' + opts.direction, '0px').delay(20).animate(animationAction, time, 'linear', postReveal);
						});
					}
				}
				else {
					return false;
				}
			};

			// here we hide the current content and reset the ticker elements to a default state ready for the next ticker item

			function postReveal() {
				if (settings.play) {
					// we have to separately fade the content out here to get around an IE bug - needs further investigation
					$(settings.dom.contentID).delay(opts.pauseOnItems).fadeOut(opts.fadeOutSpeed);
					// deal with the rest of the content, prepare the DOM and trigger the next ticker
					if (opts.displayType == 'fade') {
						$(settings.dom.contentID).fadeOut(opts.fadeOutSpeed, function () {
							$(settings.dom.wrapperID).find(settings.dom.revealElem + ',' + settings.dom.contentID).hide().end().find(settings.dom.tickerID + ',' + settings.dom.revealID).show().end().find(settings.dom.tickerID + ',' + settings.dom.revealID).removeAttr('style');
							setupContentAndTriggerDisplay();
						});
					}
					else {
						$(settings.dom.revealID).hide(0, function () {
							$(settings.dom.contentID).fadeOut(opts.fadeOutSpeed, function () {
								$(settings.dom.wrapperID).find(settings.dom.revealElem + ',' + settings.dom.contentID).hide().end().find(settings.dom.tickerID + ',' + settings.dom.revealID).show().end().find(settings.dom.tickerID + ',' + settings.dom.revealID).removeAttr('style');
								setupContentAndTriggerDisplay();
							});
						});
					}
				}
				else {
					$(settings.dom.revealElem).hide();
				}
			}

			// pause ticker

			function pauseTicker() {
				settings.play = false;
				// stop animation and show content - must pass "true, true" to the stop function, or we can get some funky behaviour
				$(settings.dom.tickerID + ',' + settings.dom.revealID + ',' + settings.dom.titleID + ',' + settings.dom.titleElem + ',' + settings.dom.revealElem + ',' + settings.dom.contentID).stop(true, true);
				$(settings.dom.revealID + ',' + settings.dom.revealElem).hide();
				$(settings.dom.wrapperID).find(settings.dom.titleID + ',' + settings.dom.titleElem).show().end().find(settings.dom.contentID).show();
			}

			// play ticker

			function restartTicker() {
				settings.play = true;
				settings.paused = false;
				// start the ticker again
				postReveal();
			}

			// change the content on user input

			function manualChangeContent(direction) {
				pauseTicker();
				switch (direction) {
				case 'prev':
					if (settings.position == 0) {
						settings.position = countSize(settings.newsArr) - 2;
					}
					else if (settings.position == 1) {
						settings.position = countSize(settings.newsArr) - 1;
					}
					else {
						settings.position = settings.position - 2;
					}
					$(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
					$(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);
					break;
				case 'next':
					$(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
					$(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);
					break;
				}
				// set the next content item to be used - loop round if we are at the end of the content
				if (settings.position == (countSize(settings.newsArr) - 1)) {
					settings.position = 0;
				}
				else {
					settings.position++;
				}
			}
		});
	};

	// plugin defaults - added as a property on our plugin function
	$.fn.ticker.defaults = {
		speed: 0.10,
		ajaxFeed: false,
		feedUrl: '',
		feedType: 'xml',
		displayType: 'reveal',
		htmlFeed: true,
		debugMode: true,
		controls: true,
		titleText: 'Latest',
		direction: 'ltr',
		pauseOnItems: 3000,
		fadeInSpeed: 600,
		fadeOutSpeed: 300
	};
})(jQuery);

/*!
 * jQuery corner plugin: simple corner rounding
 * Examples and documentation at: http://jquery.malsup.com/corner/
 * version 2.12 (23-MAY-2011)
 * Requires jQuery v1.3.2 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Dave Methvin and Mike Alsup
 */

/**
 *  corner() takes a single string argument:  $('#myDiv').corner("effect corners width")
 *
 *  effect:  name of the effect to apply, such as round, bevel, notch, bite, etc (default is round). 
 *  corners: one or more of: top, bottom, tr, tl, br, or bl.  (default is all corners)
 *  width:   width of the effect; in the case of rounded corners this is the radius. 
 *           specify this value using the px suffix such as 10px (yes, it must be pixels).
 */
;
(function ($) {

	var style = document.createElement('div').style,
		moz = style['MozBorderRadius'] !== undefined,
		webkit = style['WebkitBorderRadius'] !== undefined,
		radius = style['borderRadius'] !== undefined || style['BorderRadius'] !== undefined,
		mode = document.documentMode || 0,
		noBottomFold = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8),

		expr = $.browser.msie && (function () {
			var div = document.createElement('div');
			try {
				div.style.setExpression('width', '0+0');
				div.style.removeExpression('width');
			}
			catch (e) {
				return false;
			}
			return true;
		})();

	$.support = $.support || {};
	$.support.borderRadius = moz || webkit || radius; // so you can do:  if (!$.support.borderRadius) $('#myDiv').corner();

	function sz(el, p) {
		return parseInt($.css(el, p)) || 0;
	};

	function hex2(s) {
		s = parseInt(s).toString(16);
		return (s.length < 2) ? '0' + s : s;
	};

	function gpc(node) {
		while (node) {
			var v = $.css(node, 'backgroundColor'),
				rgb;
			if (v && v != 'transparent' && v != 'rgba(0, 0, 0, 0)') {
				if (v.indexOf('rgb') >= 0) {
					rgb = v.match(/\d+/g);
					return '#' + hex2(rgb[0]) + hex2(rgb[1]) + hex2(rgb[2]);
				}
				return v;
			}
			if (node.nodeName.toLowerCase() == 'html') break;
			node = node.parentNode; // keep walking if transparent
		}
		return '#ffffff';
	};

	function getWidth(fx, i, width) {
		switch (fx) {
		case 'round':
			return Math.round(width * (1 - Math.cos(Math.asin(i / width))));
		case 'cool':
			return Math.round(width * (1 + Math.cos(Math.asin(i / width))));
		case 'sharp':
			return width - i;
		case 'bite':
			return Math.round(width * (Math.cos(Math.asin((width - i - 1) / width))));
		case 'slide':
			return Math.round(width * (Math.atan2(i, width / i)));
		case 'jut':
			return Math.round(width * (Math.atan2(width, (width - i - 1))));
		case 'curl':
			return Math.round(width * (Math.atan(i)));
		case 'tear':
			return Math.round(width * (Math.cos(i)));
		case 'wicked':
			return Math.round(width * (Math.tan(i)));
		case 'long':
			return Math.round(width * (Math.sqrt(i)));
		case 'sculpt':
			return Math.round(width * (Math.log((width - i - 1), width)));
		case 'dogfold':
		case 'dog':
			return (i & 1) ? (i + 1) : width;
		case 'dog2':
			return (i & 2) ? (i + 1) : width;
		case 'dog3':
			return (i & 3) ? (i + 1) : width;
		case 'fray':
			return (i % 2) * width;
		case 'notch':
			return width;
		case 'bevelfold':
		case 'bevel':
			return i + 1;
		case 'steep':
			return i / 2 + 1;
		case 'invsteep':
			return (width - i) / 2 + 1;
		}
	};

	$.fn.corner = function (options) {
		// in 1.3+ we can fix mistakes with the ready state
		if (this.length == 0) {
			if (!$.isReady && this.selector) {
				var s = this.selector,
					c = this.context;
				$(function () {
					$(s, c).corner(options);
				});
			}
			return this;
		}

		return this.each(function (index) {
			var $this = $(this),
				// meta values override options
				o = [$this.attr($.fn.corner.defaults.metaAttr) || '', options || ''].join(' ').toLowerCase(),
				keep = /keep/.test(o),
				// keep borders?
				cc = ((o.match(/cc:(#[0-9a-f]+)/) || [])[1]),
				// corner color
				sc = ((o.match(/sc:(#[0-9a-f]+)/) || [])[1]),
				// strip color
				width = parseInt((o.match(/(\d+)px/) || [])[1]) || 10,
				// corner width
				re = /round|bevelfold|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dogfold|dog|invsteep|steep/,
				fx = ((o.match(re) || ['round'])[0]),
				fold = /dogfold|bevelfold/.test(o),
				edges = {
					T: 0,
					B: 1
				},
				opts = {
					TL: /top|tl|left/.test(o),
					TR: /top|tr|right/.test(o),
					BL: /bottom|bl|left/.test(o),
					BR: /bottom|br|right/.test(o)
				},
				// vars used in func later
				strip, pad, cssHeight, j, bot, d, ds, bw, i, w, e, c, common, $horz;

			if (!opts.TL && !opts.TR && !opts.BL && !opts.BR) opts = {
				TL: 1,
				TR: 1,
				BL: 1,
				BR: 1
			};

			// support native rounding
			if ($.fn.corner.defaults.useNative && fx == 'round' && (radius || moz || webkit) && !cc && !sc) {
				if (opts.TL) $this.css(radius ? 'border-top-left-radius' : moz ? '-moz-border-radius-topleft' : '-webkit-border-top-left-radius', width + 'px');
				if (opts.TR) $this.css(radius ? 'border-top-right-radius' : moz ? '-moz-border-radius-topright' : '-webkit-border-top-right-radius', width + 'px');
				if (opts.BL) $this.css(radius ? 'border-bottom-left-radius' : moz ? '-moz-border-radius-bottomleft' : '-webkit-border-bottom-left-radius', width + 'px');
				if (opts.BR) $this.css(radius ? 'border-bottom-right-radius' : moz ? '-moz-border-radius-bottomright' : '-webkit-border-bottom-right-radius', width + 'px');
				return;
			}

			strip = document.createElement('div');
			$(strip).css({
				overflow: 'hidden',
				height: '1px',
				minHeight: '1px',
				fontSize: '1px',
				backgroundColor: sc || 'transparent',
				borderStyle: 'solid'
			});

			pad = {
				T: parseInt($.css(this, 'paddingTop')) || 0,
				R: parseInt($.css(this, 'paddingRight')) || 0,
				B: parseInt($.css(this, 'paddingBottom')) || 0,
				L: parseInt($.css(this, 'paddingLeft')) || 0
			};

			if (typeof this.style.zoom != undefined) this.style.zoom = 1; // force 'hasLayout' in IE
			if (!keep) this.style.border = 'none';
			strip.style.borderColor = cc || gpc(this.parentNode);
			cssHeight = $(this).outerHeight();

			for (j in edges) {
				bot = edges[j];
				// only add stips if needed
				if ((bot && (opts.BL || opts.BR)) || (!bot && (opts.TL || opts.TR))) {
					strip.style.borderStyle = 'none ' + (opts[j + 'R'] ? 'solid' : 'none') + ' none ' + (opts[j + 'L'] ? 'solid' : 'none');
					d = document.createElement('div');
					$(d).addClass('jquery-corner');
					ds = d.style;

					bot ? this.appendChild(d) : this.insertBefore(d, this.firstChild);

					if (bot && cssHeight != 'auto') {
						if ($.css(this, 'position') == 'static') this.style.position = 'relative';
						ds.position = 'absolute';
						ds.bottom = ds.left = ds.padding = ds.margin = '0';
						if (expr) ds.setExpression('width', 'this.parentNode.offsetWidth');
						else ds.width = '100%';
					}
					else if (!bot && $.browser.msie) {
						if ($.css(this, 'position') == 'static') this.style.position = 'relative';
						ds.position = 'absolute';
						ds.top = ds.left = ds.right = ds.padding = ds.margin = '0';

						// fix ie6 problem when blocked element has a border width
						if (expr) {
							bw = sz(this, 'borderLeftWidth') + sz(this, 'borderRightWidth');
							ds.setExpression('width', 'this.parentNode.offsetWidth - ' + bw + '+ "px"');
						}
						else ds.width = '100%';
					}
					else {
						ds.position = 'relative';
						ds.margin = !bot ? '-' + pad.T + 'px -' + pad.R + 'px ' + (pad.T - width) + 'px -' + pad.L + 'px' : (pad.B - width) + 'px -' + pad.R + 'px -' + pad.B + 'px -' + pad.L + 'px';
					}

					for (i = 0; i < width; i++) {
						w = Math.max(0, getWidth(fx, i, width));
						e = strip.cloneNode(false);
						e.style.borderWidth = '0 ' + (opts[j + 'R'] ? w : 0) + 'px 0 ' + (opts[j + 'L'] ? w : 0) + 'px';
						bot ? d.appendChild(e) : d.insertBefore(e, d.firstChild);
					}

					if (fold && $.support.boxModel) {
						if (bot && noBottomFold) continue;
						for (c in opts) {
							if (!opts[c]) continue;
							if (bot && (c == 'TL' || c == 'TR')) continue;
							if (!bot && (c == 'BL' || c == 'BR')) continue;

							common = {
								position: 'absolute',
								border: 'none',
								margin: 0,
								padding: 0,
								overflow: 'hidden',
								backgroundColor: strip.style.borderColor
							};
							$horz = $('<div/>').css(common).css({
								width: width + 'px',
								height: '1px'
							});
							switch (c) {
							case 'TL':
								$horz.css({
									bottom: 0,
									left: 0
								});
								break;
							case 'TR':
								$horz.css({
									bottom: 0,
									right: 0
								});
								break;
							case 'BL':
								$horz.css({
									top: 0,
									left: 0
								});
								break;
							case 'BR':
								$horz.css({
									top: 0,
									right: 0
								});
								break;
							}
							d.appendChild($horz[0]);

							var $vert = $('<div/>').css(common).css({
								top: 0,
								bottom: 0,
								width: '1px',
								height: width + 'px'
							});
							switch (c) {
							case 'TL':
								$vert.css({
									left: width
								});
								break;
							case 'TR':
								$vert.css({
									right: width
								});
								break;
							case 'BL':
								$vert.css({
									left: width
								});
								break;
							case 'BR':
								$vert.css({
									right: width
								});
								break;
							}
							d.appendChild($vert[0]);
						}
					}
				}
			}
		});
	};

	$.fn.uncorner = function () {
		if (radius || moz || webkit) this.css(radius ? 'border-radius' : moz ? '-moz-border-radius' : '-webkit-border-radius', 0);
		$('div.jquery-corner', this).remove();
		return this;
	};

	// expose options
	$.fn.corner.defaults = {
		useNative: true,
		// true if plugin should attempt to use native browser support for border radius rounding
		metaAttr: 'data-corner' // name of meta attribute to use for options
	};

})(jQuery);



(function ($) {
	$.fn.expandable = function (options) {
		if (typeof options == 'undefined') {
			options = {};
		}

		return this.each(function () {
			var $this = this;

			function expandSection(expandableLink, event) {

				if (!$(expandableLink).hasClass('expandedLink')) {
					$('.expandableLink', $this).not(expandableLink).removeClass("expandedLink").nextAll('.expandableContent').hide();
					$(expandableLink).addClass('expandedLink').nextAll('.expandableContent').first().slideDown('fast', function () {
						if (typeof options['toggle'] == 'function') {
							options.toggle.call(this, event);
						}
					});

					$(expandableLink).next('ul.ul-expandable').next('.expandableContent').next('.showMore').text('Collapse').addClass('expanded');
				}
			}

			function collapseSection(event) {
				$('.expandableLink', $this).removeClass("expandedLink").nextAll('.expandableContent').hide().find('.expandedLink').removeClass('expandedLink').nextAll('.expandableContent').first().slideUp('fast', function () {
					if (typeof options['toggle'] == 'function') {
						options.toggle.call(this, event);
					}
				});

				$('.showMore').text('See All').removeClass('expanded');
			}

			function collapseOtherSections(exclude, event) {
				$('.expandableLink', $this).not(exclude).removeClass("expandedLink").nextAll('.expandableContent').hide().find('.expandedLink').removeClass('expandedLink').nextAll('.expandableContent').first().slideUp('fast', function () {
					if (typeof options['toggle'] == 'function') {
						options.toggle.call(this, event);
					}
				});

				$('.expandableLink').nextAll('.showMore').text('See All').removeClass('expanded');
			}

			function closeOtherLinks(link) {
				$('li.expanded').not(link).removeClass('expanded').children('p, ul').slideUp('fast');
			}


			function closeLink(link) {
				$(link).removeClass('expanded').children('p, ul').slideUp('fast');
			}

			function openLink(link) {
				$(link).addClass('expanded').children('p, ul').slideDown('fast');
			}

			$('.ul-expandable p, .ul-expandable ul', $this).hide();

			$('<a class="showMore">See All</a>').insertAfter('ul.expandableContent', $this).click(function () {
				$(this).prevAll('.expandableLink').first().click();
			});

			$('.expandableLink', $this).click(function (event) {
				event.preventDefault();

				$('.ul-expandable li', $this).children('p, ul').hide();
				$('li.expanded', $this).removeClass('expanded');

				if ($(this).hasClass('expandedLink')) {
					collapseSection(event);
				} else {
					expandSection(this, event);
				}
			});


			$('.ul-expandable li', $this).click(function (event) {
				var parent_link = $(this).parent().prevAll('.expandableLink').first();

				closeOtherLinks(this);

				if (!$(this).parents('.expandableContent').size() > 0) {
					collapseOtherSections(parent_link, event);
					expandSection(parent_link, event);
				}

				if ($(this).hasClass('expanded')) {
					closeLink(this);
				} else {
					openLink(this);
				}

				if (typeof options['toggle'] == 'function') {
					options.toggle.call(this, event);
				}
			});
		});
	}
})(jQuery);


(function ($) {
	$.fn.setEqualHeight = function () {
		var tallestcolumn = 0;
		this.each(function () {
			currentHeight = $(this).height();
			if (currentHeight > tallestcolumn) {
				tallestcolumn = currentHeight;
			}
		});
		this.css('min-height', tallestcolumn);

		return this;
	};
})(jQuery);

// get html from ajax call or json object

// make whole thing events based

// background customisation (a la bbc)

// truncate long strings?
