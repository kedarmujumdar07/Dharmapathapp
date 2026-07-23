import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:video_player/video_player.dart';

/// Complete high-fidelity Onboarding and Login experience for DharmaPath
class DharmaPathOnboarding extends StatefulWidget {
  const DharmaPathOnboarding({super.key});

  @override
  State<DharmaPathOnboarding> createState() => _DharmaPathOnboardingState();
}

class _DharmaPathOnboardingState extends State<DharmaPathOnboarding> {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  Timer? _autoSkipTimer;

  // Active background colors for the 4 screens
  final List<Color> _backgroundColors = [
    const Color(0xFFEE9B48), // Screen 1: Orangeish
    const Color(0xFF550303), // Screen 2: Deep Red
    const Color(0xFF151627), // Screen 3: Dark Navy Blue-Grey
    const Color(0xFFFFF8F2), // Screen 4: Cream Login
  ];

  @override
  void initState() {
    super.initState();
    _startAutoSkipTimer();
  }

  void _startAutoSkipTimer() {
    _autoSkipTimer?.cancel();
    // Only auto-skip if we are not on the last screen (Login Screen)
    if (_currentPage < 3) {
      _autoSkipTimer = Timer.periodic(const Duration(seconds: 7), (timer) {
        if (_currentPage < 3) {
          _pageController.nextPage(
            duration: const Duration(milliseconds: 460),
            curve: Curves.easeInOut,
          );
        } else {
          _autoSkipTimer?.cancel();
        }
      });
    }
  }

  void _onPageChanged(int index) {
    setState(() {
      _currentPage = index;
    });
    // Restart/reset the 7-second timer whenever the page changes (either swipe or click)
    _startAutoSkipTimer();
  }

  @override
  void dispose() {
    _autoSkipTimer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedContainer(
        duration: const Duration(milliseconds: 460),
        curve: Curves.easeInOut,
        color: _backgroundColors[_currentPage],
        child: SafeArea(
          child: PageView(
            controller: _pageController,
            onPageChanged: _onPageChanged,
            physics: const BouncingScrollPhysics(),
            children: [
              // Screen 1
              _buildOnboardingScreen(
                title: 'Epics\nCome\nAlive.',
                sub: 'Ramayana, Mahabharata and more —\ntold through stunning comic stories.',
                videoAsset: 'assets/videos/screen1_veo.mp4',
                videoWidth: 324,
                videoHeight: 182,
                progress: 0.33,
                dotIndex: 0,
                isDarkTheme: true,
                onNext: () => _pageController.animateToPage(1,
                    duration: const Duration(milliseconds: 460),
                    curve: Curves.easeInOut),
              ),

              // Screen 2
              _buildOnboardingScreen(
                title: 'Ancient\nWisdom,\nDaily.',
                sub: 'Mantras, Panchang and festival stories —\nevery single day.',
                videoAsset: 'assets/videos/screen2_yogi.mp4',
                videoWidth: 232,
                videoHeight: 290,
                progress: 0.66,
                dotIndex: 1,
                isDarkTheme: true,
                onNext: () => _pageController.animateToPage(2,
                    duration: const Duration(milliseconds: 460),
                    curve: Curves.easeInOut),
              ),

              // Screen 3
              _buildOnboardingScreen(
                title: 'Play.\nLearn.\nGrow.',
                sub: 'Earn XP, build streaks and climb the\nleagues — learning feels like a game.',
                videoAsset: 'assets/videos/screen3_trophies.mp4',
                videoWidth: 324,
                videoHeight: 240,
                progress: 1.0,
                dotIndex: 2,
                isDarkTheme: true,
                xpBadgeText: '+10 XP Earned!',
                nextButtonText: "Let's Begin!",
                onNext: () => _pageController.animateToPage(3,
                    duration: const Duration(milliseconds: 460),
                    curve: Curves.easeInOut),
              ),

              // Screen 4: Unified Login Screen
              _buildLoginScreen(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOnboardingScreen({
    required String title,
    required String sub,
    required String videoAsset,
    required double videoWidth,
    required double videoHeight,
    required double progress,
    required int dotIndex,
    required bool isDarkTheme,
    required VoidCallback onNext,
    String? xpBadgeText,
    String nextButtonText = 'Next',
  }) {
    final textColor = isDarkTheme ? Colors.white : const Color(0xFF1C2536);
    final subColor = isDarkTheme ? Colors.white.withOpacity(0.9) : const Color(0xFF4A5568);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Top bar containing dots indicator
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(3, (idx) {
              final active = idx == dotIndex;
              return AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                margin: const EdgeInsets.symmetric(horizontal: 4),
                width: active ? 16 : 6,
                height: 6,
                decoration: BoxDecoration(
                  color: active ? textColor : textColor.withOpacity(0.35),
                  borderRadius: BorderRadius.circular(3),
                ),
              );
            }),
          ),
          const SizedBox(height: 24),

          // Illustration Area with custom video viewport
          Expanded(
            child: Center(
              child: Stack(
                clipBehavior: Clip.none,
                children: [
                  VideoPageIllustration(
                    assetPath: videoAsset,
                    width: videoWidth,
                    height: videoHeight,
                    isActive: _currentPage == dotIndex,
                  ),
                  if (xpBadgeText != null)
                    Positioned(
                      top: -12,
                      right: -16,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFFE066),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: const [
                            BoxShadow(
                              color: Colors.black12,
                              blurRadius: 8,
                              offset: Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Text(
                          xpBadgeText,
                          style: GoogleFonts.poppins(
                            color: const Color(0xFF151627),
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),

          // Text content zone
          Text(
            title,
            style: GoogleFonts.poppins(
              color: textColor,
              fontSize: 36,
              fontWeight: FontWeight.w800,
              height: 1.1,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            sub,
            style: GoogleFonts.poppins(
              color: subColor,
              fontSize: 14,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 24),

          // Progress track
          Container(
            height: 4,
            decoration: BoxDecoration(
              color: textColor.withOpacity(0.2),
              borderRadius: BorderRadius.circular(2),
            ),
            child: FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: progress,
              child: Container(
                decoration: BoxDecoration(
                  color: textColor,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Action Button
          ElevatedButton(
            onPressed: onNext,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: _backgroundColors[_currentPage],
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(26),
              ),
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  nextButtonText,
                  style: GoogleFonts.poppins(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(width: 8),
                const Icon(Icons.arrow_forward, size: 18),
              ],
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildLoginScreen() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Branding Header, Mascot and Tagline
          Column(
            children: [
              const SizedBox(height: 20),
              RichText(
                text: TextSpan(
                  children: [
                    TextSpan(
                      text: 'DHARMA',
                      style: GoogleFonts.playfairDisplay(
                        fontSize: 34,
                        fontWeight: FontWeight.w900,
                        color: const Color(0xFFD84B16),
                        letterSpacing: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: 'PATH',
                      style: GoogleFonts.playfairDisplay(
                        fontSize: 34,
                        fontWeight: FontWeight.w900,
                        color: const Color(0xFF1C2536),
                        letterSpacing: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              // Vector Mascot
              SizedBox(
                width: 250,
                height: 250,
                child: SvgPicture.string(_mascotSvgString),
              ),
              const SizedBox(height: 18),
              Text(
                'The free, fun, and sacred way to learn Hinduism.',
                textAlign: TextAlign.center,
                style: GoogleFonts.poppins(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: const Color(0xFF1C2536).withOpacity(0.75),
                  height: 1.55,
                ),
              ),
            ],
          ),

          // Actions Box
          Column(
            children: [
              // Google Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton.icon(
                  onPressed: () {},
                  icon: const GoogleLogoWidget(),
                  label: const Text('Continue with Google'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFD84B16),
                    foregroundColor: Colors.white,
                    elevation: 0,
                    shadowColor: const Color(0xFFD84B16).withOpacity(0.15),
                    shape: const StadiumBorder(),
                    textStyle: GoogleFonts.poppins(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // Apple Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.apple, size: 22, color: Colors.white),
                  label: const Text('Sign in with Apple'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1C2536),
                    foregroundColor: Colors.white,
                    elevation: 0,
                    shadowColor: const Color(0xFF1C2536).withOpacity(0.15),
                    shape: const StadiumBorder(),
                    textStyle: GoogleFonts.poppins(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 14),

              // Agreement text
              Text.rich(
                TextSpan(
                  text: 'By continuing you agree to our\n',
                  children: [
                    TextSpan(
                      text: 'Terms of Service',
                      style: GoogleFonts.poppins(
                        fontWeight: FontWeight.w500,
                        color: const Color(0xFF1C2536),
                        decoration: TextDecoration.underline,
                      ),
                    ),
                    const TextSpan(text: ' & '),
                    TextSpan(
                      text: 'Privacy Policy',
                      style: GoogleFonts.poppins(
                        fontWeight: FontWeight.w500,
                        color: const Color(0xFF1C2536),
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ],
                ),
                textAlign: TextAlign.center,
                style: GoogleFonts.poppins(
                  fontSize: 11,
                  color: const Color(0xFF1C2536).withOpacity(0.55),
                  height: 1.6,
                ),
              ),
              const SizedBox(height: 10),
            ],
          ),
        ],
      ),
    );
  }

  // Inline Mascot SVG asset
  static const String _mascotSvgString = r'''<svg width="100%" viewBox="0 0 680 829.02" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Dharma Marg cow mascot</title>
            <desc>A cute anthropomorphic cow mascot dressed as a South Indian Brahmin with white veshti, yellow shirt, orange shalle, vibhuti on forehead, holding a palm-leaf manuscript</desc>

            <!-- Floating animation -->
            <style>
              .mascot-body { animation: floatMascot 3s ease-in-out infinite; transform-origin: 340px 500px; }
              @keyframes floatMascot {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-12px); }
              }
              .tail { animation: wag 1.8s ease-in-out infinite; transform-origin: 430px 560px; }
              @keyframes wag {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(18deg); }
              }
              .ear-left { animation: earflap 2.5s ease-in-out infinite; transform-origin: 215px 285px; }
              .ear-right { animation: earflap 2.5s ease-in-out infinite 0.4s; transform-origin: 465px 285px; }
              @keyframes earflap {
                0%, 80%, 100% { transform: rotate(0deg); }
                90% { transform: rotate(-8deg); }
              }
              .blink { animation: blink 4s ease-in-out infinite; transform-origin: 340px 295px; }
              @keyframes blink {
                0%, 90%, 100% { transform: scaleY(1); }
                95% { transform: scaleY(0.08); }
              }
            </style>

            <!-- ground shadow -->
            <ellipse cx="340" cy="762" rx="105" ry="18" fill="rgba(0,0,0,0.07)"/>

            <g class="mascot-body">
              <!-- TAIL -->
              <g class="tail">
                <path d="M430,555 Q490,500 478,440 Q468,395 455,372" fill="none" stroke="rgb(200,160,96)" stroke-width="7" stroke-linecap="round"/>
                <!-- tuft -->
                <ellipse cx="456" cy="366" rx="16" ry="22" transform="rotate(20,456,366)" fill="rgb(138,80,32)"/>
                <line x1="448" y1="352" x2="460" y2="382" stroke="#7a4010" stroke-width="2.5"/>
                <line x1="443" y1="359" x2="455" y2="386" stroke="#7a4010" stroke-width="2.5"/>
                <line x1="453" y1="350" x2="463" y2="380" stroke="#7a4010" stroke-width="2.5"/>
              </g>

              <!-- LEGS / HOOVES -->
              <rect x="290" y="680" width="42" height="55" rx="10" fill="rgb(212,160,96)"/>
              <rect x="350" y="680" width="42" height="55" rx="10" fill="rgb(212,160,96)"/>
              <!-- hooves - split hoof cow style -->
              <rect x="289" y="720" width="44" height="20" rx="8" fill="rgb(60,40,20)"/>
              <rect x="349" y="720" width="44" height="20" rx="8" fill="rgb(60,40,20)"/>
              <!-- hoof split line -->
              <line x1="311" y1="720" x2="311" y2="740" stroke="rgb(40,25,10)" stroke-width="2"/>
              <line x1="371" y1="720" x2="371" y2="740" stroke="rgb(40,25,10)" stroke-width="2"/>

              <!-- VESHTI (white lungi) -->
              <path d="M245,555 Q248,700 300,730 Q340,742 380,730 Q432,700 435,555 Z" fill="rgb(249,243,227)"/>
              <path d="M250,700 Q290,732 340,736 Q390,732 430,700 L432,688 Q392,722 340,728 Q288,722 248,688 Z" fill="rgb(212,175,55)"/>
              <line x1="295" y1="565" x2="290" y2="700" stroke="rgb(224,213,181)" stroke-width="1.5"/>
              <line x1="318" y1="560" x2="316" y2="718" stroke="rgb(224,213,181)" stroke-width="1.5"/>
              <line x1="340" y1="558" x2="340" y2="722" stroke="rgb(224,213,181)" stroke-width="1.5"/>
              <line x1="362" y1="560" x2="364" y2="718" stroke="rgb(224,213,181)" stroke-width="1.5"/>
              <line x1="385" y1="565" x2="390" y2="700" stroke="rgb(224,213,181)" stroke-width="1.5"/>

              <!-- BODY / SHIRT -->
              <ellipse cx="340" cy="470" rx="108" ry="115" fill="rgb(245,200,66)"/>
              <!-- cow black patches on body -->
              <ellipse cx="300" cy="440" rx="28" ry="22" opacity="0.18" fill="rgb(30,20,10)" transform="rotate(-15,300,440)"/>
              <ellipse cx="390" cy="490" rx="22" ry="17" opacity="0.15" fill="rgb(30,20,10)" transform="rotate(10,390,490)"/>
              <!-- shirt collar shading -->
              <path d="M282,398 Q340,438 398,398 L393,445 Q340,460 287,445 Z" fill="rgb(212,168,32)"/>

              <!-- SHALLE over left shoulder -->
              <path d="M238,408 Q255,396 274,388 Q292,438 308,490 Q288,502 265,488 Q248,442 238,408 Z" fill="rgb(232,82,26)"/>
              <path d="M238,408 Q242,406 246,404 Q263,448 278,492 Q274,493 270,494 Q254,448 238,408 Z" fill="rgb(191,58,0)"/>
              <path d="M265,488 Q250,520 236,558 Q250,562 262,558 Q276,523 292,494 Z" fill="rgb(232,82,26)"/>
              <path d="M236,558 Q238,566 240,572 Q254,568 265,563 Q264,560 262,558 Z" fill="rgb(191,58,0)"/>

              <!-- LEFT ARM -->
              <ellipse cx="224" cy="490" rx="34" ry="56" transform="rotate(-18,224,490)" fill="rgb(240,224,192)"/>
              <ellipse cx="216" cy="540" rx="20" ry="16" fill="rgb(212,184,150)"/>

              <!-- RIGHT ARM (holding palm leaf) -->
              <ellipse cx="458" cy="478" rx="34" ry="56" transform="rotate(18,458,478)" fill="rgb(240,224,192)"/>
              <ellipse cx="466" cy="528" rx="20" ry="16" fill="rgb(212,184,150)"/>

              <!-- PALM LEAF manuscript -->
              <ellipse cx="500" cy="438" rx="54" ry="17" transform="rotate(-28,500,438)" fill="rgb(181,201,106)"/>
              <ellipse cx="500" cy="438" rx="46" ry="11" transform="rotate(-28,500,438)" fill="rgb(122,154,53)"/>
              <line x1="472" y1="455" x2="528" y2="421" stroke="#9ab045" stroke-width="1.8"/>
              <line x1="476" y1="458" x2="532" y2="425" stroke="#c8da80" stroke-width="1"/>
              <line x1="480" y1="461" x2="536" y2="428" stroke="#c8da80" stroke-width="1"/>
              <path d="M468,458 L456,474" fill="none" stroke="rgb(138,96,32)" stroke-width="3" stroke-linecap="round"/>

              <!-- OM on shirt -->
              <text x="340" y="516" fill="rgb(191,128,0)" font-family="serif" font-size="26" font-weight="700" text-anchor="middle">ॐ</text>

              <!-- COW EARS -->
              <g class="ear-left">
                <ellipse cx="218" cy="292" rx="38" ry="52" transform="rotate(-30,218,292)" fill="rgb(232,200,160)"/>
                <ellipse cx="218" cy="292" rx="24" ry="35" transform="rotate(-30,218,292)" fill="rgb(240,168,155)"/>
              </g>
              <g class="ear-right">
                <ellipse cx="462" cy="292" rx="38" ry="52" transform="rotate(30,462,292)" fill="rgb(232,200,160)"/>
                <ellipse cx="462" cy="292" rx="24" ry="35" transform="rotate(30,462,292)" fill="rgb(240,168,155)"/>
              </g>

              <!-- HEAD base -->
              <ellipse cx="340" cy="290" rx="112" ry="112" fill="rgb(240,224,192)"/>
              <ellipse cx="290" cy="265" rx="30" ry="22" opacity="0.22" fill="rgb(30,20,10)" transform="rotate(-10,290,265)"/>
              <ellipse cx="395" cy="248" rx="24" ry="18" opacity="0.18" fill="rgb(30,20,10)" transform="rotate(8,395,248)"/>

              <!-- COW MUZZLE -->
              <rect x="272" y="336" width="136" height="82" rx="38" fill="rgb(232,160,128)"/>
              <rect x="285" y="342" width="110" height="50" rx="28" fill="rgb(245,178,152)" opacity="0.55"/>

              <!-- HORNS -->
              <path d="M252,202 Q200,140 220,100 Q234,78 250,100 Q268,140 268,190 Z" fill="rgb(200,176,96)"/>
              <ellipse cx="232" cy="100" rx="12" ry="16" fill="rgb(160,120,48)"/>
              <path d="M428,202 Q480,140 460,100 Q446,78 430,100 Q412,140 412,190 Z" fill="rgb(200,176,96)"/>
              <ellipse cx="448" cy="100" rx="12" ry="16" fill="rgb(160,120,48)"/>

              <!-- VIBHUTI -->
              <rect x="308" y="218" width="64" height="5" rx="3" fill="rgb(232,232,232)"/>
              <rect x="312" y="230" width="56" height="5" rx="3" fill="rgb(232,232,232)"/>
              <rect x="316" y="242" width="48" height="5" rx="3" fill="rgb(232,232,232)"/>
              <circle cx="340" cy="219" r="5" fill="rgb(204,34,34)"/>

              <!-- EYES -->
              <g class="blink">
                <ellipse cx="298" cy="295" rx="30" ry="28" fill="rgb(255,253,231)"/>
                <circle cx="304" cy="297" r="17" fill="rgb(58,32,8)"/>
                <circle cx="302" cy="295" r="11" fill="rgb(26,10,0)"/>
                <circle cx="295" cy="289" r="5" fill="white"/>
                <circle cx="305" cy="304" r="2.5" fill="white" opacity="0.6"/>
                <ellipse cx="382" cy="295" rx="30" ry="28" fill="rgb(255,253,231)"/>
                <circle cx="376" cy="297" r="17" fill="rgb(58,32,8)"/>
                <circle cx="378" cy="295" r="11" fill="rgb(26,10,0)"/>
                <circle cx="387" cy="289" r="5" fill="white"/>
                <circle cx="377" cy="304" r="2.5" fill="white" opacity="0.6"/>
              </g>

              <!-- eyelashes -->
              <line x1="278" y1="278" x2="272" y2="268" stroke="#8a5030" stroke-width="2" stroke-linecap="round"/>
              <line x1="288" y1="271" x2="284" y2="261" stroke="#8a5030" stroke-width="2" stroke-linecap="round"/>
              <line x1="300" y1="269" x2="298" y2="258" stroke="#8a5030" stroke-width="2" stroke-linecap="round"/>
              <line x1="402" y1="278" x2="408" y2="268" stroke="#8a5030" stroke-width="2" stroke-linecap="round"/>
              <line x1="392" y1="271" x2="396" y2="261" stroke="#8a5030" stroke-width="2" stroke-linecap="round"/>
              <line x1="380" y1="269" x2="382" y2="258" stroke="#8a5030" stroke-width="2" stroke-linecap="round"/>

              <!-- eyebrows -->
              <path d="M272,272 Q294,262 318,268" fill="none" stroke="#7a4020" stroke-width="5" stroke-linecap="round"/>
              <path d="M362,268 Q386,262 408,272" fill="none" stroke="#7a4020" stroke-width="5" stroke-linecap="round"/>

              <!-- NOSTRILS -->
              <ellipse cx="316" cy="374" rx="14" ry="10" fill="rgb(185,90,70)"/>
              <ellipse cx="364" cy="374" rx="14" ry="10" fill="rgb(185,90,70)"/>
              <ellipse cx="316" cy="375" rx="8" ry="6" fill="rgb(145,55,40)" opacity="0.7"/>
              <ellipse cx="364" cy="375" rx="8" ry="6" fill="rgb(145,55,40)" opacity="0.7"/>

              <!-- MOUTH -->
              <path d="M312,396 Q340,416 368,396" fill="none" stroke="rgb(160,80,64)" stroke-width="2.5" stroke-linecap="round"/>

              <!-- NOSE RING -->
              <ellipse cx="340" cy="356" rx="16" ry="8" fill="none" stroke="rgb(212,175,55)" stroke-width="4"/>
              <ellipse cx="340" cy="356" rx="16" ry="8" fill="none" stroke="rgb(245,215,80)" stroke-width="2" opacity="0.6"/>

              <!-- CHEEK blush -->
              <ellipse cx="264" cy="328" rx="22" ry="13" fill="#f08080" opacity="0.28"/>
              <ellipse cx="416" cy="328" rx="22" ry="13" fill="#f08080" opacity="0.28"/>
            </g>
          </svg>''';
}

/// A lightweight stateful wrapper for video playback on onboarding screens
class VideoPageIllustration extends StatefulWidget {
  final String assetPath;
  final double width;
  final double height;
  final bool isActive;

  const VideoPageIllustration({
    required this.assetPath,
    required this.width,
    required this.height,
    required this.isActive,
    super.key,
  });

  @override
  State<VideoPageIllustration> createState() => _VideoPageIllustrationState();
}

class _VideoPageIllustrationState extends State<VideoPageIllustration> {
  VideoPlayerController? _controller;
  bool _isInitialized = false;

  @override
  void initState() {
    super.initState();
    _initializeController();
  }

  void _initializeController() {
    _controller = VideoPlayerController.asset(widget.assetPath)
      ..initialize().then((_) {
        if (mounted) {
          setState(() {
            _isInitialized = true;
          });
          _controller!.setLooping(true);
          _controller!.setVolume(0.0);
          if (widget.isActive) {
            _controller!.play();
          }
        }
      });
  }

  @override
  void didUpdateWidget(covariant VideoPageIllustration oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (_controller != null && _isInitialized) {
      if (widget.isActive) {
        _controller!.seekTo(Duration.zero);
        _controller!.play();
      } else {
        _controller!.pause();
      }
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_isInitialized) {
      return SizedBox(
        width: widget.width,
        height: widget.height,
        child: const Center(
          child: SizedBox(
            width: 24,
            height: 24,
            child: CircularProgressIndicator(
              color: Colors.white24,
              strokeWidth: 2.5,
            ),
          ),
        ),
      );
    }
    return Container(
      width: widget.width,
      height: widget.height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.15),
            blurRadius: 36,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Center(
        child: AspectRatio(
          aspectRatio: _controller!.value.aspectRatio,
          child: VideoPlayer(_controller!),
        ),
      ),
    );
  }
}

/// Custom Google logo widget utilizing drawing paths
class GoogleLogoWidget extends StatelessWidget {
  const GoogleLogoWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 20,
      height: 20,
      decoration: const BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
      ),
      padding: const EdgeInsets.all(4),
      child: SvgPicture.string(
        r'''<svg viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>'''
      ),
    );
  }
}
