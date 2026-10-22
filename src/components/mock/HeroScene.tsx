import { BrandMark } from "@/components/brand/BrandMark";

/**
 * An illustrative website and phone, drawn in CSS: a horse sales page and the instant
 * reply a buyer receives. All names and details are fictional.
 */
export function HeroScene() {
  return (
    <figure className="m-0">
      <div className="mock-scene">
        <div className="mock" aria-hidden="true">
          <div className="mk-browser">
            <div className="mk-bar">
              <div className="mk-url">willowbrook-yard.example</div>
            </div>
            <div className="mk-head">
              <span className="mk-logo">Willowbrook Yard</span>
              <span className="mk-nav">
                <span>Horses</span>
                <span>Sold</span>
                <span>About</span>
                <span>Contact</span>
              </span>
            </div>
            <div className="mk-body">
              <div>
                <div className="mk-photo">
                  <BrandMark />
                </div>
                <div className="mk-thumbs">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div>
                <div className="mk-title">Daisy</div>
                <div className="mk-sub">Seven-year-old bay mare, 16.1hh</div>
                <div className="mk-facts">
                  <div>
                    <small>Level</small>
                    <b>Novice</b>
                  </div>
                  <div>
                    <small>Suited to</small>
                    <b>Jumping, hacking</b>
                  </div>
                  <div>
                    <small>Paperwork</small>
                    <b>Ready to view</b>
                  </div>
                  <div>
                    <small>Videos</small>
                    <b>Walk, trot, canter</b>
                  </div>
                </div>
                <div className="mk-price">Price on application</div>
                <div className="mk-btns">
                  <span className="mk-btn">Enquire</span>
                  <span className="mk-btn alt">Watch video</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mk-phone">
            <div className="mk-screen">
              <div className="mk-chat-head">
                <b>Willowbrook Yard</b>
                <small>Replied instantly</small>
              </div>
              <div className="mk-msgs">
                <div className="mk-bubble in">Is Daisy still available?</div>
                <div className="mk-bubble out">
                  Hello Sarah, thank you for asking about Daisy. She is still available: a seven-year-old, 16.1hh bay
                  mare. Her videos are below.
                </div>
                <div className="mk-bubble out">Could I ask what level of rider she would be for?</div>
                <div className="mk-chips">
                  <span className="mk-chip">Novice</span>
                  <span className="mk-chip">Intermediate</span>
                  <span className="mk-chip">Experienced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-5 text-small text-ink-muted">
        Illustrative design. Names and details are fictional.
      </figcaption>
    </figure>
  );
}
