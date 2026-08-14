/**
 * Centralized Site Configuration & Data Store
 * Edit this file to update contacts, social links, resume links, and status across the entire portfolio.
 */
const SITE_DATA = {
  name: "Kenneth Torcuator",
  role: "Full-Stack Software Engineer",
  email: "torcuatorkenneth6@gmail.com",
  github: "https://github.com/daikendy",
  linkedin: "https://linkedin.com/in/kenneth-torcuator",
  twitter: "https://x.com/hawkmoth110",
  resumeUrl: "assets/resume.pdf",
  subpageResumeUrl: "../assets/resume.pdf",
  statusText: "currently building",
  location: "Metro Manila, Philippines",
  education: "BS Computer Engineering, NU",
  scholarship: "SM Foundation Scholar",
  posthogApiKey: "phc_usqGSFGbgjMBnWHuEdLno4eUkgYuYcJJ7hQqUvMDeKP2",
  posthogApiHost: "https://us.i.posthog.com"
};

const HARDWARE_DATA = {
  heroHead: "I bridge silicon & software — <em>embedded C, logic synthesis</em>, and hardware co-design.",
  heroSub: "Designing digital logic, firmware for microcontrollers, and hardware-constrained software systems. Pursuing a BS in Computer Engineering at National University as an SM Foundation Scholar.",
  heroMeta: [
    { val: "Verilog / HDL", desc: "iVerilog & GTKWave digital logic simulation" },
    { val: "STM32 / ESP32", desc: "FreeRTOS & bare-metal C/C++ firmware" },
    { val: "I2C / SPI / UART", desc: "Low-level hardware protocol interfacing" },
    { val: "Circuit & CAD", desc: "AutoCAD & PCB schematic design" }
  ],
  ticker: ["EMBEDDED C", "VERILOG", "STM32", "ESP32", "FPGA", "RTOS", "I2C", "SPI", "UART", "AUTOCAD", "PCB DESIGN", "LOGIC SYNTHESIS", "EMBEDDED C", "VERILOG", "STM32", "ESP32", "FPGA", "RTOS", "I2C", "SPI", "UART", "AUTOCAD", "PCB DESIGN", "LOGIC SYNTHESIS"],
  stackCategories: [
    {
      label: "Languages & HDL",
      rows: [
        { name: "C / C++", why: "The foundational language for microcontroller bare-metal drivers, memory management, and deterministic embedded execution." },
        { name: "Verilog / SystemVerilog", why: "Hardware description language for digital logic design, finite state machines, and FPGA logic synthesis." },
        { name: "Python", why: "Used for automated test benches, serial protocol data logging, and hardware simulation scripting." }
      ]
    },
    {
      label: "Microcontrollers & RTOS",
      rows: [
        { name: "STM32 (ARM Cortex-M)", why: "Industry-standard 32-bit MCU platform for real-time control, DMA transfers, and timer interrupt systems." },
        { name: "ESP32 / AVR", why: "Dual-core microcontrollers for IoT edge telemetry, sensor processing, and embedded server nodes." },
        { name: "FreeRTOS", why: "Preemptive real-time operating system for multi-threaded task scheduling, semaphores, and inter-task queues." }
      ]
    },
    {
      label: "Hardware Protocols & Bus Systems",
      rows: [
        { name: "UART / SPI / I2C", why: "Synchronous and asynchronous bus protocols for sensor communication, display controllers, and peripheral expansion." },
        { name: "PWM & ADC / DAC", why: "Analog-to-digital conversion, signal processing, and pulse-width modulation for motor speed & power control." }
      ]
    },
    {
      label: "EDA & Engineering Tooling",
      rows: [
        { name: "iVerilog & GTKWave", why: "Open-source Verilog simulation suite for waveform analysis and timing verification before hardware flash." },
        { name: "AutoCAD 2026", why: "Computer-aided design for 2D engineering drawings, mechanical enclosures, and hardware layout schematics." },
        { name: "Logic Analyzers & Scope", why: "Physical waveform verification, bus decoding, and signal integrity debugging at the hardware level." }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SITE_DATA, HARDWARE_DATA };
}

