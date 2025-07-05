import Timeline from "./Timeline";

export default function HowItWorks() {
    return (
        <div className="bg-primary">
            <div className="mx-auto flex max-w-[1200px] min-h-screen flex-col items-center justify-start gap-4 p-3">
                <span className="text-s-text font-poppins my-8 text-4xl font-semibold">
                    How It Works?
                </span>
                <Timeline />
            </div>
        </div>
    );
}
