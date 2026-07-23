import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  // Colors
  static const Color bgDark = Color(0xFF0C0E12);
  static const Color bgDark2 = Color(0xFF14171D);
  static const Color cardDark = Color(0xFF151A22);
  static const Color textLight = Color(0xFFF3EFE6);
  static const Color textMuted = Color(0xFF7C8492);
  static const Color accent = Color(0xFFE8500A);
  static const Color cardBorder = Color(0x14FFFFFF); // ~0.08 opacity

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgDark,
      body: SafeArea(
        child: Column(
          children: [
            _buildStatusBarMock(),
            _buildHeaderBar(),
            Expanded(
              child: ListView(
                physics: const BouncingScrollPhysics(),
                padding: const EdgeInsets.symmetric(vertical: 10),
                children: [
                  _buildPanchangCard(),
                  const SizedBox(height: 15),
                  _buildEventCard(),
                  const SizedBox(height: 15),
                  _buildContinueLessonCard(),
                  const SizedBox(height: 24),
                  _buildLearningPathSection(),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: _buildCustomBottomNav(),
    );
  }

  Widget _buildStatusBarMock() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 8),
      color: bgDark,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '9:41',
            style: GoogleFonts.outfit(
              fontSize: 11,
              fontWeight: FontWeight.bold,
              color: Colors.white.withOpacity(0.7),
            ),
          ),
          Row(
            children: [
              Icon(Icons.signal_cellular_4_bar, size: 14, color: Colors.white.withOpacity(0.7)),
              const SizedBox(width: 6),
              Icon(Icons.wifi, size: 14, color: Colors.white.withOpacity(0.7)),
              const SizedBox(width: 6),
              Icon(Icons.battery_full, size: 14, color: Colors.white.withOpacity(0.7)),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildHeaderBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: BoxDecoration(
        color: bgDark,
        border: Border(bottom: BorderSide(color: Colors.white.withOpacity(0.03))),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'DharmaPath',
            style: GoogleFonts.spaceGrotesk(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: textLight,
              letterSpacing: -0.5,
            ),
          ),
          Row(
            children: [
              _buildBadgePill('🔥', '12', const Color(0x59E8500A)),
              const SizedBox(width: 8),
              _buildBadgePill('❤️', '5', const Color(0x59E2472F)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBadgePill(String icon, String text, Color glowColor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: cardDark.withOpacity(0.85),
        borderRadius: BorderRadius.circular(99),
        border: Border.all(color: glowColor),
        boxShadow: [
          BoxShadow(
            color: glowColor.withOpacity(0.2),
            blurRadius: 10,
          )
        ],
      ),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 11)),
          const SizedBox(width: 4),
          Text(
            text,
            style: GoogleFonts.jetBrainsMono(
              fontSize: 11,
              fontWeight: FontWeight.bold,
              color: textLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPanchangCard() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: ClipPath(
        clipper: DiagonalCutClipper(),
        child: Container(
          height: 170,
          padding: const EdgeInsets.all(16),
          color: const Color(0xFFEFEBE4), // Cream/sand
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    flex: 12,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'SYS::PANCHANG',
                          style: GoogleFonts.jetBrainsMono(
                            fontSize: 8,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.8,
                            color: const Color(0xFF7C8492),
                          ),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFF14171D),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('TITHI', style: GoogleFonts.jetBrainsMono(fontSize: 7, fontWeight: FontWeight.bold, color: Colors.white70, letterSpacing: 0.5)),
                              Text('Shukla Ekadashi', style: GoogleFonts.spaceGrotesk(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: -0.2)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    flex: 8,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text('NAKSHATRA: ROHINI', style: GoogleFonts.jetBrainsMono(fontSize: 8, color: const Color(0xFF5C6470))),
                        Text('YOGA: VYATIPATA', style: GoogleFonts.jetBrainsMono(fontSize: 8, color: const Color(0xFF5C6470))),
                        Text('KARANA: VANIJA', style: GoogleFonts.jetBrainsMono(fontSize: 8, color: const Color(0xFF5C6470))),
                      ],
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.only(top: 8),
                decoration: const BoxDecoration(
                  border: Border(top: BorderSide(color: Color(0xFFDCD7CE))),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Today's Panchang", style: GoogleFonts.spaceGrotesk(fontSize: 13, fontWeight: FontWeight.bold, color: const Color(0xFF14171D), letterSpacing: -0.3)),
                        Text("Shukla Ekadashi", style: GoogleFonts.spaceGrotesk(fontSize: 10, fontWeight: FontWeight.w500, color: const Color(0xFF14171D).withOpacity(0.8))),
                      ],
                    ),
                    Text(
                      'View Full →',
                      style: GoogleFonts.spaceGrotesk(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFFC8501A),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildEventCard() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: ClipPath(
        clipper: DiagonalCutClipper(),
        child: Container(
          height: 170,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFFD23C2C), // Red background
            boxShadow: [BoxShadow(color: const Color(0xFFD23C2C).withOpacity(0.3), blurRadius: 24, offset: const Offset(0, 8))],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'EVT::FESTIVAL',
                          style: GoogleFonts.jetBrainsMono(
                            fontSize: 8,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.8,
                            color: Colors.white70,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: Colors.black.withOpacity(0.3),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.white.withOpacity(0.15)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('COUNTDOWN', style: GoogleFonts.jetBrainsMono(fontSize: 7, fontWeight: FontWeight.bold, color: Colors.white70, letterSpacing: 0.5)),
                              Text('2 Days', style: GoogleFonts.spaceGrotesk(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: -0.2)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.only(top: 8),
                decoration: BoxDecoration(
                  border: Border(top: BorderSide(color: Colors.white.withOpacity(0.15))),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Maha Shivaratri", style: GoogleFonts.spaceGrotesk(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: -0.3)),
                        Text("Auspicious Festival", style: GoogleFonts.spaceGrotesk(fontSize: 10, fontWeight: FontWeight.w500, color: Colors.white70)),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(4),
                        boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 8, offset: Offset(0, 4))],
                      ),
                      child: Text(
                        'DETAILS →',
                        style: GoogleFonts.jetBrainsMono(
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFFD23C2C),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildContinueLessonCard() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: ClipPath(
        clipper: DiagonalCutClipper(),
        child: Container(
          height: 230,
          decoration: BoxDecoration(
            color: cardDark,
            gradient: LinearGradient(
              colors: [cardDark, const Color(0xFF1E2430)],
              begin: Alignment.bottomCenter,
              end: Alignment.topCenter,
            ),
          ),
          child: Stack(
            children: [
              // Placeholder for background image
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.black.withOpacity(0.8), Colors.transparent],
                      begin: Alignment.bottomCenter,
                      end: Alignment.topCenter,
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'UNIT::ACTIVE',
                          style: GoogleFonts.jetBrainsMono(
                            fontSize: 8,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.8,
                            color: Colors.white70,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: accent.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: accent.withOpacity(0.5)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('LESSON 4', style: GoogleFonts.jetBrainsMono(fontSize: 7, fontWeight: FontWeight.bold, color: accent, letterSpacing: 0.5)),
                              Text('The Devotion of Hanuman', style: GoogleFonts.spaceGrotesk(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: -0.2)),
                            ],
                          ),
                        ),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: LinearProgressIndicator(
                                value: 0.6,
                                backgroundColor: Colors.white.withOpacity(0.1),
                                valueColor: const AlwaysStoppedAnimation<Color>(accent),
                                minHeight: 4,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              '60%',
                              style: GoogleFonts.jetBrainsMono(fontSize: 10, color: Colors.white),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Continue Learning", style: GoogleFonts.spaceGrotesk(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                                  const SizedBox(height: 4),
                                  Text("Explore the meaning of true devotion.", style: GoogleFonts.outfit(fontSize: 12, color: Colors.white70)),
                                ],
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              decoration: BoxDecoration(
                                color: accent,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                'CONTINUE →',
                                style: GoogleFonts.jetBrainsMono(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLearningPathSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'LEARNING PATH',
                style: GoogleFonts.spaceGrotesk(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: textLight,
                ),
              ),
              Text(
                'View All →',
                style: GoogleFonts.spaceGrotesk(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: textMuted,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 170,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: 3,
            separatorBuilder: (_, __) => const SizedBox(width: 12),
            itemBuilder: (context, index) {
              return _buildPathCard(index);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildPathCard(int index) {
    List<Map<String, dynamic>> paths = [
      {'title': 'Bhagavad Gita', 'xp': '120 XP', 'progress': 0.4},
      {'title': 'Ramayana', 'xp': '200 XP', 'progress': 0.1},
      {'title': 'Upanishads', 'xp': '50 XP', 'progress': 0.8},
    ];
    final path = paths[index];

    return Container(
      width: 140,
      decoration: BoxDecoration(
        color: cardDark,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cardBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 80,
            decoration: const BoxDecoration(
              color: Color(0xFF1E2430),
              borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
            ),
            // Placeholder for image
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  path['title'],
                  style: GoogleFonts.spaceGrotesk(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: textLight,
                  ),
                ),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: accent.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    path['xp'],
                    style: GoogleFonts.jetBrainsMono(
                      fontSize: 9,
                      color: accent,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                LinearProgressIndicator(
                  value: path['progress'],
                  backgroundColor: Colors.white.withOpacity(0.05),
                  valueColor: const AlwaysStoppedAnimation<Color>(accent),
                  minHeight: 3,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCustomBottomNav() {
    return Container(
      height: 70,
      decoration: BoxDecoration(
        color: const Color(0xFF151A22),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Stack(
        children: [
          // Animated Bubble
          AnimatedPositioned(
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOutCubic,
            left: (MediaQuery.of(context).size.width / 5) * _currentIndex + (MediaQuery.of(context).size.width / 10) - 25,
            top: 10,
            child: Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                color: accent.withOpacity(0.2),
                shape: BoxShape.circle,
              ),
            ),
          ),
          AnimatedPositioned(
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOutCubic,
            left: (MediaQuery.of(context).size.width / 5) * _currentIndex + (MediaQuery.of(context).size.width / 10) - 20,
            top: 15,
            child: Container(
              width: 40,
              height: 40,
              decoration: const BoxDecoration(
                color: accent,
                shape: BoxShape.circle,
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(0, Icons.home_rounded, 'Home'),
              _buildNavItem(1, Icons.map_rounded, 'Paths'),
              _buildNavItem(2, Icons.self_improvement_rounded, 'Mantra'),
              _buildNavItem(3, Icons.emoji_events_rounded, 'Leagues'),
              _buildNavItem(4, Icons.person_rounded, 'Profile'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    bool isActive = _currentIndex == index;
    return GestureDetector(
      onTap: () {
        setState(() {
          _currentIndex = index;
        });
      },
      behavior: HitTestBehavior.opaque,
      child: SizedBox(
        width: MediaQuery.of(context).size.width / 5,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              color: isActive ? Colors.white : textMuted,
              size: isActive ? 24 : 22,
            ),
            const SizedBox(height: 4),
            if (!isActive)
              Text(
                label,
                style: GoogleFonts.outfit(
                  fontSize: 10,
                  color: textMuted,
                  fontWeight: FontWeight.w500,
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class DiagonalCutClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = Path();
    path.moveTo(0, 20);
    path.lineTo(20, 0);
    path.lineTo(size.width, 0);
    path.lineTo(size.width, size.height - 20);
    path.lineTo(size.width - 20, size.height);
    path.lineTo(0, size.height);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}
