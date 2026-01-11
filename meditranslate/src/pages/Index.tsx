import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="medical">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            AI-Powered Medical Report Translation
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Understand Your{' '}
            <span className="text-primary">Medical Reports</span>
            <br />
            in Simple Terms
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Upload your medical reports, lab results, or prescriptions. Our AI will translate
            complex medical terminology into easy-to-understand language.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <Button variant="medical" size="lg" className="gap-2">
                Start Translating Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                I Have an Account
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy Upload</h3>
              <p className="text-sm text-muted-foreground">
                Simply take a photo or upload your medical documents
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Instant Translation</h3>
              <p className="text-sm text-muted-foreground">
                Get clear explanations in seconds, powered by AI
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Private & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Your medical data is encrypted and never shared
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          © 2024 MediTranslate. This tool is for educational purposes only and does not replace professional medical advice.
        </p>
      </footer>
    </div>
  );
};

export default Index;
