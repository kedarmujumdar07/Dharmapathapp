import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'screens/onboarding_screen.dart';
import 'screens/preferences_screen.dart';
import 'screens/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);
  runApp(const DharmaPathApp());
}

class DharmaPathApp extends StatelessWidget {
  const DharmaPathApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DharmaPath',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFD84B16)),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const OnboardingScreen(),
        '/preferences': (context) => const PreferencesScreen(),
        '/home': (context) => const HomeScreen(),
      },
    );
  }
}
