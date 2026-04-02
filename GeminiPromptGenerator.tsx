import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  genero: string;
  idade: string;
  etnia: string;
  porte: string;
  cabeloCor: string;
  cabeloEstilo: string;
  detalhesExtra: string;
  roupaTipo: string;
  roupaCor: string;
  roupaDesc: string;
  expressao: string;
  postura: string;
  fundo: string;
  enquadramento: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const GENEROS = [
  { label: "Homem", value: "homem" },
  { label: "Mulher", value: "mulher" },
  { label: "Menino", value: "criança menino" },
  { label: "Menina", value: "criança menina" },
];

const EXPRESSOES = [
  { label: "Neutra", value: "expressão neutra e profissional" },
  { label: "Sorriso leve", value: "sorriso leve e amigável" },
  { label: "Sorriso amplo", value: "sorriso amplo e aberto" },
  { label: "Séria", value: "expressão séria" },
];

const POSTURAS = [
  { label: "Frente", value: "postura ereta, olhando para frente" },
  { label: "De lado", value: "levemente inclinado para o lado" },
  { label: "Relaxada", value: "postura relaxada, casual" },
];

const FUNDOS = [
  { label: "Branco puro", value: "fundo branco puro, sem sombras" },
  { label: "Branco suave", value: "fundo branco acinzentado, levemente gradiente" },
  { label: "Transparente", value: "fundo transparente (sem fundo)" },
  { label: "Cinza neutro", value: "fundo cinza claro neutro" },
];

const ENQUADRAMENTOS = [
  { label: "Corpo inteiro", value: "retrato corpo inteiro, da cabeça aos pés" },
  { label: "Meio corpo", value: "retrato até a cintura" },
  { label: "Close rosto", value: "retrato close no rosto e ombros" },
];

const ETNIAS = [
  { label: "— selecione —", value: "" },
  { label: "Branca / Europeia", value: "pele clara, feições europeias" },
  { label: "Latina / Morena clara", value: "pele morena clara, feições latinas" },
  { label: "Afro-latina / Morena", value: "pele morena, feições afro-latinas" },
  { label: "Negra / Africana", value: "pele negra, feições africanas" },
  { label: "Asiática", value: "pele asiática, feições asiáticas" },
  { label: "Oriente Médio", value: "pele mediterrânea, feições do oriente médio" },
  { label: "Indígena", value: "pele indígena, feições nativas" },
];

const PORTES = [
  { label: "— selecione —", value: "" },
  { label: "Baixo / pequeno", value: "baixo porte, corpo pequeno" },
  { label: "Médio", value: "porte médio, altura mediana" },
  { label: "Alto e esguio", value: "alto, corpo esguio" },
  { label: "Alto e atlético", value: "alto, corpo atlético" },
  { label: "Robusto / forte", value: "corpo robusto e forte" },
  { label: "Plus size", value: "corpo plus size" },
];

const CABELO_COR = [
  { label: "— selecione —", value: "" },
  { label: "Preto", value: "cabelo preto" },
  { label: "Castanho escuro", value: "cabelo castanho escuro" },
  { label: "Castanho claro", value: "cabelo castanho claro" },
  { label: "Loiro", value: "cabelo loiro" },
  { label: "Ruivo", value: "cabelo ruivo" },
  { label: "Grisalho", value: "cabelo grisalho" },
  { label: "Branco", value: "cabelo branco" },
  { label: "Tingido / colorido", value: "cabelo tingido colorido" },
];

const CABELO_ESTILO = [
  { label: "— selecione —", value: "" },
  { label: "Curto", value: "cabelo curto" },
  { label: "Médio", value: "cabelo médio" },
  { label: "Longo", value: "cabelo longo" },
  { label: "Liso", value: "cabelo liso" },
  { label: "Ondulado", value: "cabelo ondulado" },
  { label: "Cacheado", value: "cabelo cacheado" },
  { label: "Crespo", value: "cabelo crespo" },
  { label: "Careca", value: "careca" },
  { label: "Coque", value: "cabelo preso em coque" },
  { label: "Rabo de cavalo", value: "rabo de cavalo" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildPrompt(f: FormState): string {
  const parts: string[] = [];

  let pessoa = `Foto fotorrealista de ${f.genero}`;
  if (f.idade) pessoa += `, de aproximadamente ${f.idade}`;
  if (f.etnia) pessoa += `, ${f.etnia}`;
  if (f.porte) pessoa += `, ${f.porte}`;
  parts.push(pessoa);

  const cabelo = [f.cabeloCor, f.cabeloEstilo].filter(Boolean).join(", ");
  if (cabelo) parts.push(`com ${cabelo}`);
  if (f.detalhesExtra) parts.push(f.detalhesExtra);

  const roupa = f.roupaDesc
    ? `vestindo ${f.roupaDesc}`
    : [f.roupaCor, f.roupaTipo].filter(Boolean).join(" ")
    ? `vestindo ${[f.roupaCor, f.roupaTipo].filter(Boolean).join(" ")}`
    : "";
  if (roupa) parts.push(roupa);

  parts.push(`${f.expressao}, ${f.postura}`);
  parts.push(f.enquadramento);
  parts.push(f.fundo);
  parts.push("iluminação de estúdio suave e uniforme");
  parts.push("estilo de foto de catálogo profissional, alta qualidade, realista");
  parts.push(
    "use a imagem de referência como base para o estilo de roupa, postura e enquadramento, variando apenas as características físicas descritas acima"
  );

  return parts.join(", ") + ".";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ChipGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}

function ChipGroup({ options, value, onChange }: ChipGroupProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 13,
            cursor: "pointer",
            border: value === opt.value ? "1.5px solid #2563eb" : "1px solid #d1d5db",
            background: value === opt.value ? "#eff6ff" : "#f9fafb",
            color: value === opt.value ? "#1d4ed8" : "#6b7280",
            fontWeight: value === opt.value ? 600 : 400,
            transition: "all 0.15s",
            fontFamily: "inherit",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 16,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 14,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  fontSize: 14,
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  color: "#111827",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GeminiPromptGenerator() {
  const [form, setForm] = useState<FormState>({
    genero: "homem",
    idade: "",
    etnia: "",
    porte: "",
    cabeloCor: "",
    cabeloEstilo: "",
    detalhesExtra: "",
    roupaTipo: "",
    roupaCor: "",
    roupaDesc: "",
    expressao: "expressão neutra e profissional",
    postura: "postura ereta, olhando para frente",
    fundo: "fundo branco puro, sem sombras",
    enquadramento: "retrato corpo inteiro, da cabeça aos pés",
  });

  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (key: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleGenerate = () => setPrompt(buildPrompt(form));

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "32px 16px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#111827",
            margin: 0,
          }}
        >
          Gerador de Prompt — Gemini
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
          Preencha as características e gere um prompt para variação de modelo com foto de referência.
        </p>
      </div>

      {/* Gênero */}
      <Section title="Gênero">
        <ChipGroup options={GENEROS} value={form.genero} onChange={set("genero")} />
      </Section>

      {/* Aparência */}
      <Section title="Aparência física">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
              Idade aproximada
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="ex: 30 anos, jovem, idoso..."
              value={form.idade}
              onChange={(e) => set("idade")(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
              Etnia / Tom de pele
            </label>
            <select
              style={inputStyle}
              value={form.etnia}
              onChange={(e) => set("etnia")(e.target.value)}
            >
              {ETNIAS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
              Altura / Porte
            </label>
            <select
              style={inputStyle}
              value={form.porte}
              onChange={(e) => set("porte")(e.target.value)}
            >
              {PORTES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
              Cabelo (cor)
            </label>
            <select
              style={inputStyle}
              value={form.cabeloCor}
              onChange={(e) => set("cabeloCor")(e.target.value)}
            >
              {CABELO_COR.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
              Cabelo (estilo)
            </label>
            <select
              style={inputStyle}
              value={form.cabeloEstilo}
              onChange={(e) => set("cabeloEstilo")(e.target.value)}
            >
              {CABELO_ESTILO.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
            Detalhes adicionais (barba, óculos, sardas, etc.)
          </label>
          <input
            style={inputStyle}
            type="text"
            placeholder="ex: barba curta, óculos redondos, sardas..."
            value={form.detalhesExtra}
            onChange={(e) => set("detalhesExtra")(e.target.value)}
          />
        </div>
      </Section>

      {/* Roupa */}
      <Section title="Roupa / Uniforme">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
              Tipo de roupa
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="ex: uniforme azul, avental branco..."
              value={form.roupaTipo}
              onChange={(e) => set("roupaTipo")(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
              Cor principal
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="ex: azul marinho, branco..."
              value={form.roupaCor}
              onChange={(e) => set("roupaCor")(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>
            Descrição da roupa da foto de referência
          </label>
          <textarea
            style={{ ...inputStyle, resize: "vertical", minHeight: 72, lineHeight: 1.6 }}
            placeholder="Descreva a roupa do modelo base que será mantida em todas as variações..."
            value={form.roupaDesc}
            onChange={(e) => set("roupaDesc")(e.target.value)}
          />
        </div>
      </Section>

      {/* Expressão e postura */}
      <Section title="Expressão e postura">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 8 }}>
              Expressão facial
            </label>
            <ChipGroup options={EXPRESSOES} value={form.expressao} onChange={set("expressao")} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 8 }}>
              Postura
            </label>
            <ChipGroup options={POSTURAS} value={form.postura} onChange={set("postura")} />
          </div>
        </div>
      </Section>

      {/* Fundo e enquadramento */}
      <Section title="Fundo e enquadramento">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 8 }}>
              Tipo de fundo
            </label>
            <ChipGroup options={FUNDOS} value={form.fundo} onChange={set("fundo")} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 8 }}>
              Enquadramento
            </label>
            <ChipGroup options={ENQUADRAMENTOS} value={form.enquadramento} onChange={set("enquadramento")} />
          </div>
        </div>
      </Section>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        style={{
          width: "100%",
          padding: "12px 0",
          background: "#1d4ed8",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
          transition: "background 0.15s",
          marginBottom: 16,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1e40af")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
      >
        Gerar prompt para o Gemini
      </button>

      {/* Output */}
      {prompt && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: 0,
              }}
            >
              Prompt gerado
            </p>
            <button
              onClick={handleCopy}
              style={{
                padding: "6px 16px",
                fontSize: 13,
                cursor: "pointer",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                background: copied ? "#f0fdf4" : "#f9fafb",
                color: copied ? "#15803d" : "#6b7280",
                fontFamily: "inherit",
                fontWeight: copied ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.8,
              fontFamily: "'Fira Code', 'Courier New', monospace",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "12px 16px",
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {prompt}
          </p>
        </div>
      )}
    </div>
  );
}
