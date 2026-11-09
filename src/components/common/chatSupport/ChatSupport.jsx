import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../../../services/api";

const initialMessage =
  "Hi! I’m Chiderah’s AI assistant. What are you looking to build: a web or mobile app, a product redesign, or a backend/API?";

const createWhatsAppUrl = (brief) => {
  const projectDetails = brief.trim();
  const message = projectDetails
    ? `Hello Chiderah, I have a project inquiry.\n\n${projectDetails}`
    : "Hello Chiderah, I have a project inquiry and would like to discuss your services.";
  return `https://wa.me/2348050347869?text=${encodeURIComponent(message)}`;
};

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    brief: "",
    privacyConsent: false,
  });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages, isSending, showInquiryForm, inquiryStatus]);

  const getConversationBrief = () =>
    messages
      .filter((message) => message.role === "user")
      .map((message) => `- ${message.content}`)
      .join("\n")
      .slice(0, 2000);

  const openInquiryForm = () => {
    setInquiry((previous) => ({
      ...previous,
      brief: getConversationBrief(),
    }));
    setInquiryStatus("");
    setInquirySubmitted(false);
    setShowInquiryForm(true);
  };

  const handleSend = async (event, suggestedMessage) => {
    event?.preventDefault();
    const content = (suggestedMessage ?? draft).trim();
    if (!content || !hasConsent || isSending) return;

    const recentMessages = messages
      .slice(-11)
      .map(({ role, content: messageContent }) => ({
        role,
        content: messageContent,
      }));

    setDraft("");
    setMessages((previous) => [...previous, { role: "user", content }]);
    setIsSending(true);

    try {
      const response = await apiService.sendChatMessage([
        ...recentMessages,
        { role: "user", content },
      ]);
      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: response.reply },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I can’t connect to chat support right now. You can try again, send your project details below, or contact me on WhatsApp.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleInquirySubmit = async (event) => {
    event.preventDefault();
    if (!inquiry.privacyConsent || isSubmittingInquiry) return;

    setIsSubmittingInquiry(true);
    setInquiryStatus("");
    try {
      await apiService.submitContactForm({
        name: inquiry.name.trim(),
        email: inquiry.email.trim(),
        location: "",
        budget: "",
        subject: "Project inquiry from chat support",
        message: inquiry.brief.trim(),
        privacy_consent: true,
      });
      setInquirySubmitted(true);
      setInquiryStatus("Thanks! Your project inquiry has been sent.");
    } catch {
      setInquiryStatus(
        "Your inquiry could not be sent. Please try again or continue on WhatsApp.",
      );
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const whatsappUrl = createWhatsAppUrl(inquiry.brief);
  const chatWhatsappUrl = createWhatsAppUrl(getConversationBrief());

  return (
    <>
      {isOpen && (
        <section
          aria-label="Chat support"
          className="fixed bottom-24 right-4 z-[60] flex h-[min(640px,calc(100dvh_-_7rem))] w-[calc(100vw_-_2rem)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-6"
        >
          <header className="flex items-center justify-between bg-[#132238] px-4 py-4 text-white">
            <div>
              <h2 className="font-semibold">Chat with Chiderah</h2>
              <p className="mt-1 text-xs text-white/75">AI project assistant</p>
            </div>
            <button
              aria-label="Close chat"
              className="rounded-full p-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="m6 6 12 12M18 6 6 18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </header>

          <div className="border-b border-gray-100 bg-purple-50 px-4 py-3">
            <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-gray-700">
              <input
                checked={hasConsent}
                className="checkbox checkbox-primary checkbox-xs mt-1 shrink-0"
                onChange={(event) => setHasConsent(event.target.checked)}
                type="checkbox"
              />
              <span>
                I agree to send my chat messages to OpenAI to generate replies.
                Please don’t share sensitive information.{" "}
                <Link
                  className="font-medium underline"
                  to="/policies#privacy-policy"
                >
                  Privacy details
                </Link>
              </span>
            </label>
          </div>

          <div
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-[#F8F9FC] p-4"
            role="log"
          >
            <div className="max-w-[88%] whitespace-pre-wrap break-words rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 text-sm leading-6 text-gray-800 shadow-sm">
              {initialMessage}
            </div>
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {[
                  "I need a web application",
                  "I want a mobile app",
                  "I need backend or API help",
                ].map((suggestion) => (
                  <button
                    className="rounded-full border border-purple-200 bg-white px-3 py-2 text-left text-xs text-[#60219A] transition hover:bg-purple-50 disabled:opacity-50"
                    disabled={!hasConsent || isSending}
                    key={suggestion}
                    onClick={(event) => handleSend(event, suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, index) => (
              <div
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
                key={`${message.role}-${index}`}
              >
                <p
                  className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2.5 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-sm bg-[#9929FB] text-white"
                      : "rounded-tl-sm bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {isSending && (
              <p className="text-sm text-gray-500" role="status">
                Assistant is typing…
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showInquiryForm ? (
            <form
              className="space-y-3 border-t border-gray-100 bg-white p-4"
              onSubmit={handleInquirySubmit}
            >
              {inquirySubmitted ? (
                <div className="space-y-3">
                  <p className="text-sm text-green-700" role="status">
                    {inquiryStatus}
                  </p>
                  <a
                    className="btn btn-success btn-sm w-full text-white"
                    href={whatsappUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <p className="text-sm font-semibold text-[#132238]">
                    Send your project inquiry
                  </p>
                  <input
                    autoComplete="name"
                    className="input input-bordered input-sm w-full"
                    maxLength={200}
                    onChange={(event) =>
                      setInquiry((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    required
                    value={inquiry.name}
                  />
                  <input
                    autoComplete="email"
                    className="input input-bordered input-sm w-full"
                    maxLength={254}
                    onChange={(event) =>
                      setInquiry((previous) => ({
                        ...previous,
                        email: event.target.value,
                      }))
                    }
                    placeholder="Your email"
                    required
                    type="email"
                    value={inquiry.email}
                  />
                  <textarea
                    className="textarea textarea-bordered min-h-20 w-full text-sm"
                    maxLength={2000}
                    onChange={(event) =>
                      setInquiry((previous) => ({
                        ...previous,
                        brief: event.target.value,
                      }))
                    }
                    placeholder="Briefly describe your project"
                    required
                    value={inquiry.brief}
                  />
                  <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-gray-600">
                    <input
                      checked={inquiry.privacyConsent}
                      className="checkbox checkbox-primary checkbox-xs mt-1"
                      onChange={(event) =>
                        setInquiry((previous) => ({
                          ...previous,
                          privacyConsent: event.target.checked,
                        }))
                      }
                      required
                      type="checkbox"
                    />
                    <span>
                      I agree that my information may be used to respond to my
                      inquiry.{" "}
                      <Link
                        className="underline"
                        to="/policies#privacy-policy"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {inquiryStatus && (
                    <p className="text-sm text-red-600" role="alert">
                      {inquiryStatus}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm flex-1"
                      onClick={() => setShowInquiryForm(false)}
                      type="button"
                    >
                      Back to chat
                    </button>
                    <button
                      className="btn btn-primary btn-sm flex-1 text-white"
                      disabled={isSubmittingInquiry}
                      type="submit"
                    >
                      {isSubmittingInquiry ? "Sending…" : "Send inquiry"}
                    </button>
                  </div>
                  <a
                    className="block text-center text-xs text-picto-primary underline"
                    href={whatsappUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Or continue directly on WhatsApp
                  </a>
                </>
              )}
            </form>
          ) : (
            <div className="border-t border-gray-100 bg-white p-3">
              <button
                className="mb-2 w-full text-left text-xs font-medium text-picto-primary underline"
                onClick={openInquiryForm}
                type="button"
              >
                Send project details to Chiderah
              </button>
              <form className="flex items-end gap-2" onSubmit={handleSend}>
                <textarea
                  aria-label="Your message"
                  className="textarea textarea-bordered min-h-11 max-h-24 flex-1 resize-y text-sm"
                  disabled={!hasConsent || isSending}
                  maxLength={1200}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={
                    hasConsent ? "Tell me about your project…" : "Accept above to start chatting"
                  }
                  value={draft}
                />
                <button
                  aria-label="Send message"
                  className="btn btn-primary btn-square text-white"
                  disabled={!hasConsent || isSending || !draft.trim()}
                  type="submit"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="m5 12 14-7-4 14-3-6-7-1Zm7 1 7-8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </form>
              <a
                className="mt-2 block text-center text-xs text-picto-primary underline"
                href={chatWhatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Continue on WhatsApp with a chat summary
              </a>
            </div>
          )}
        </section>
      )}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat support" : "Open chat support"}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#9929FB] text-white shadow-lg transition hover:scale-105 hover:bg-[#7F1FD1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9929FB]"
        onClick={() => setIsOpen((previous) => !previous)}
        type="button"
      >
        {isOpen ? (
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="m6 6 12 12M18 6 6 18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M8 10h8m-8 4h5m-8 6 1.8-3.6A8 8 0 1 1 12 20H5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default ChatSupport;
