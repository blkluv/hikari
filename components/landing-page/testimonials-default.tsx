import { Card, CardHeader, CardContent } from '@/components/ui/card-header';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { testimonials } from '@/config/testimonials';

export default function Testimonials() {
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 4) {
    groupedTestimonials.push(testimonials.slice(i, i + 4));
  }

  return (
    <div className="relative flex flex-col items-center justify-center max-w-5xl p-4 mx-auto">
      <div className="flex items-center w-full mb-8 max-w-7xl">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="flex-shrink px-2 text-center">
          <h2 className="text-3xl font-bold">REACTIONS</h2>
          <p className="text-muted-foreground">
            What everyone else is saying
          </p>
        </div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex flex-wrap w-full max-w-7xl">
        {groupedTestimonials.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="flex flex-col w-full p-2 md:w-1/3 h-fit"
          >
            {group.map((testimonial, index) => (
              <Card key={index} className="h-full mb-4">
                <CardHeader className="flex flex-row items-center p-2 bg-zinc-100 dark:bg-zinc-800 rounded-t-xl">
                  <div className="flex items-center">
                    <Avatar className="mr-2 size-7"> {/* Adjusted size for smaller avatar */}
                      <AvatarImage src={testimonial.avatarImg} className="w-full h-full" />
                      <AvatarFallback className="w-full h-full">
                        {testimonial.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold">{testimonial.name}</h3>
                      <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 text-xs">
                  <p>{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
